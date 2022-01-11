using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Integrations.Woocommerce.List
{
    public class GetListOfIntegrationsHandler : IRequestHandler<GetListOfIntegrationsQuery, Result<ICollection<IntegrationDto>>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public GetListOfIntegrationsHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<ICollection<IntegrationDto>>> Handle(GetListOfIntegrationsQuery request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x => x.Integrations).ThenInclude(x => x.ClientKeys)
                .FirstOrDefaultAsync(x => x.Users.Any(y => y.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            if (company is null) return Result<ICollection<IntegrationDto>>.Failure("Company with that user not found");

            var listOfIntegrations = company.Integrations;

            var integrationsDto = new List<IntegrationDto>();

            foreach (var integration in listOfIntegrations)
            {
                integrationsDto.Add(new IntegrationDto(integration.Id.ToString(), integration.PrivateName,
                    integration.SiteUrl,integration.IntegrationType, integration.ConnectionProblem));
            }

            if (listOfIntegrations is not null) return Result<ICollection<IntegrationDto>>.Success(integrationsDto);

            return Result<ICollection<IntegrationDto>>.Failure("Integrations in company not found");
        }
    }
}
