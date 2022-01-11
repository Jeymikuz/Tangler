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
using Persistence;

namespace Application.Integrations.Woocommerce.Delete
{
    public class DeleteIntegrationHandler : IRequestHandler<DeleteIntegrationCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public DeleteIntegrationHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(DeleteIntegrationCommand request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x=>x.Integrations).ThenInclude(x=>x.ClientKeys).FirstOrDefaultAsync(x=>x.Users.Any(y=>y.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            var integration = company.Integrations.FirstOrDefault(x => x.Id.ToString() == request.Id);

            if(integration is null) return Result<Unit>.Failure("Integration does not exists"); 
            
            _context.Remove(integration);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(result) return Result<Unit>.Success(Unit.Value);

            return  Result<Unit>.Failure("Database problem while deleting integration");
        }
    }
}
