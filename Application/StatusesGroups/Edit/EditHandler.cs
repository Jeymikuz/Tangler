using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.StatusesGroups.Edit
{
    public class EditHandler : IRequestHandler<EditCommand, Result<StatusGroup>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public EditHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<StatusGroup>> Handle(EditCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(x=>x.StatusesGroups).SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<StatusGroup>.Failure("User not found");

            var statusGroup = user.Company.StatusesGroups.SingleOrDefault(s => s.Id == request.Id);

            if (statusGroup is null) return Result<StatusGroup>.Failure("Status group not found");

            if (statusGroup.Name == request.Name) return Result<StatusGroup>.Failure("Name must be changed");

            statusGroup.Name = request.Name;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<StatusGroup>.Success(statusGroup);

            return Result<StatusGroup>.Failure("Problem with database");
        }
    }
}
