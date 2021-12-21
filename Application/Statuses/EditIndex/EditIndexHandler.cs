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

namespace Application.Statuses.EditIndex
{
    public class EditIndexHandler : IRequestHandler<EditIndexCommand, Result<Unit>>
    {
        private readonly DataContext context;
        private readonly IUserAccessor userAccessor;

        public EditIndexHandler(DataContext context, IUserAccessor userAccessor)
        {
            this.context = context;
            this.userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(EditIndexCommand request, CancellationToken cancellationToken)
        {
            var user = await context.Users.Include(x => x.Company).ThenInclude(x => x.StatusesGroups).ThenInclude(x => x.Statuses).FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

            if (user is null) return Result<Unit>.Failure("User is not exists");

            var group = user.Company.StatusesGroups.FirstOrDefault(x => x.Id == request.GroupId);

            group.Statuses.FirstOrDefault(x => x.Id == request.Status1.id).Index = request.Status1.index;
            group.Statuses.FirstOrDefault(x => x.Id == request.Status2.id).Index = request.Status2.index;

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem with database");
        }
    }
}
