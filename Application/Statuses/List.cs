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

namespace Application.Statuses
{
    public static class List
    {
        public class Query : IRequest<Result<List<Status>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Status>>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(IUserAccessor userAccessor, DataContext context)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<Status>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x=>x.Company).ThenInclude(s=>s.Statuses).SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user is null) return Result<List<Status>>.Failure("User not found");

                return Result<List<Status>>.Success(user.Company.Statuses.ToList());
             }
        }
    }
}
