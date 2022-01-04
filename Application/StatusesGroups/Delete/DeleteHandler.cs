using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.StatusesGroups.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(DataContext context, IUserAccessor userAccessor, ILogger<DeleteHandler> logger)
        {
            _context = context;
            _userAccessor = userAccessor;
            _logger = logger;
        }
        

        public async Task<Result<Unit>> Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Handling Delete Status Group handler");

            var company = await _context.Companies.Include(x => x.StatusesGroups).ThenInclude(x => x.Statuses)
                .Where(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername())).FirstOrDefaultAsync();

            if(company is null) return Result<Unit>.Failure("User not found");

            var statusGroupToRemove = company.StatusesGroups.FirstOrDefault(x => x.Id == request.Id);
            if (statusGroupToRemove.Name == "Wszystkie")
            {
                _logger.LogError("User tried to removed group that cannot be removed");
                return  Result<Unit>.Failure("This group cannot be removed");
            }

            var statusGroupWithAllStatuses = company.StatusesGroups.FirstOrDefault(x => x.Name == "Wszystkie");

            
            foreach (var status in statusGroupToRemove.Statuses)
            {
                statusGroupWithAllStatuses.Statuses.Add(status);
            }
            statusGroupToRemove.Statuses.Clear();
            _context.Remove(statusGroupToRemove);

            _context.Entry(statusGroupToRemove).State = EntityState.Deleted;
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Result<Unit>.Success(Unit.Value);

            _logger.LogError("Handling Delete Status Group handler");
            return Result<Unit>.Failure("Problem with database");
        }
    }
}
