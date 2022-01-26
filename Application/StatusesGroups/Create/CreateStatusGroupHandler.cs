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

namespace Application.StatusesGroups.Create
{
    public class CreateStatusGroupHandler : IRequestHandler<CreateStatusGroupCommand, Result<StatusGroup>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateStatusGroupHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<StatusGroup>> Handle(CreateStatusGroupCommand request, CancellationToken cancellationToken)
        {
            if (String.IsNullOrEmpty(request.Name)) return Result<StatusGroup>.Failure("Name can't be empty");

            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.StatusesGroups).FirstOrDefaultAsync();

            if (user is null) return Result<StatusGroup>.Failure("User not found");

            var group = user.Company.StatusesGroups.FirstOrDefault(x => x.Name == request.Name);
            if (group is not null) return Result<StatusGroup>.Failure("Group with that name is already exists!");

            var groupWithBiggestIndex = user.Company.StatusesGroups.OrderBy(x => x.Index).ToList().LastOrDefault();

            var newGroup = new StatusGroup
            {
                Name = request.Name,
                Index = groupWithBiggestIndex.Index + 1
            };

            user.Company.StatusesGroups.Add(newGroup);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Result<StatusGroup>.Success(newGroup);
            }

            return Result<StatusGroup>.Failure("Problem with database");
        }
    }
}
