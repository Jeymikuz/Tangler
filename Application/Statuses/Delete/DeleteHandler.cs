using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Statuses.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public DeleteHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.Statuses)
                .Include(x=>x.Company).ThenInclude(x=>x.StatusesGroups).ThenInclude(x=>x.Statuses)
                .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<Unit>.Failure("User not found");

            var status = user.Company.Statuses.SingleOrDefault(s => s.Id == request.Id);

            _context.Remove(status);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<Unit>.Success(Unit.Value);

            else return Result<Unit>.Failure("Problem with deleting status in database");
        }
    }
}
