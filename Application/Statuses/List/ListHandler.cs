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
    class ListHandler : IRequestHandler<ListQuery, Result<List<Status>>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public ListHandler(IUserAccessor userAccessor, DataContext context)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result<List<Status>>> Handle(ListQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.Company).ThenInclude(s => s.Statuses).SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<List<Status>>.Failure("User not found");

            return Result<List<Status>>.Success(user.Company.Statuses.ToList());
        }
    }
}
