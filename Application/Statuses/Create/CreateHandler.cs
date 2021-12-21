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

namespace Application.Statuses.Create
{
    public class CreateHandler : IRequestHandler<CreateCommand, Result<Status>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public CreateHandler(IUserAccessor userAccessor, DataContext context)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result<Status>> Handle(CreateCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.StatusesGroups).ThenInclude(x=>x.Statuses).SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<Status>.Failure("User not found");

            var group = user.Company.StatusesGroups.FirstOrDefault(x => x.Id == request.GroupId);
            if(group.Statuses.Count > 0)
            {
            var biggestIndex = group.Statuses.OrderByDescending(x => x.Index).LastOrDefault().Index;
            request.Status.Index = ++biggestIndex;
            }
            else
            {
            request.Status.Index = 0;
            }

            group.Statuses.Add(request.Status);
            user.Company.Statuses.Add(request.Status);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Result<Status>.Success(request.Status);
            }

            return Result<Status>.Failure("Problem with database");
        }
    }
}
