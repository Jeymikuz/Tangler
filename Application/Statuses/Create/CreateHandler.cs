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

namespace Application.Statuses.Create
{
    public class CreateHandler : IRequestHandler<CreateCommand, Result<Unit>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public CreateHandler(IUserAccessor userAccessor, DataContext context)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result<Unit>> Handle(CreateCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.Statuses).SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<Unit>.Failure("User not found");

            user.Company.Statuses.Add(new Domain.Status
            {
                Name = request.Name,
                Color = request.Color
            });

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem with database");
        }
    }
}
