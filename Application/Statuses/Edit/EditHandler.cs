using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Statuses.Edit
{
    public class EditHandler : IRequestHandler<EditCommand, Result<Status>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public EditHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Status>> Handle(EditCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.Statuses).SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<Status>.Failure("User not found");

            var status = user.Company.Statuses.SingleOrDefault(s => s.Id == request.Status.Id);

            if (status is null) return Result<Status>.Failure("Status not found");

            if (status.Name == request.Status.Name && status.Color == request.Status.Color) return Result<Status>.Failure("Values are same");

            status.Name = request.Status.Name;
            status.Color = request.Status.Color;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<Status>.Success(status);

            return Result<Status>.Failure("Problem with database");
        }
    }
}
