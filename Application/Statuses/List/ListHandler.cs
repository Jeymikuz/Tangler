using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Statuses.List
{
    public class ListHandler : IRequestHandler<ListQuery, Result<List<StatusGroup>>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public ListHandler(IUserAccessor userAccessor, DataContext context)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result<List<StatusGroup>>> Handle(ListQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.StatusesGroups).ThenInclude(x=>x.Statuses).SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<List<StatusGroup>>.Failure("User not found");

            return Result<List<StatusGroup>>.Success(user.Company.StatusesGroups.ToList());
        }
    }
}
