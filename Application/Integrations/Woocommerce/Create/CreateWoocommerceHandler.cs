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
using WooCommerceNET;
using WooCommerceNET.WooCommerce.v3;
using WooCommerceNET.WooCommerce.v3.Extension;
using Order = Domain.Order;

namespace Application.Integrations.Woocommerce.Create
{
    public class CreateWoocommerceHandler : IRequestHandler<CreateWoocommerceCommand, Result<Integration>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateWoocommerceHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Integration>> Handle(CreateWoocommerceCommand request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x => x.Integrations)
                .FirstOrDefaultAsync(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            var newIntegration = new Integration();

            newIntegration.PrivateName = request.PrivateName;
            newIntegration.SiteUrl = request.SiteUrl;
            newIntegration.ClientKeys = new List<IntegrationKeyValueItem>();

            newIntegration.ClientKeys.Add(new IntegrationKeyValueItem("client_key", request.ClientKey));
            newIntegration.ClientKeys.Add(new IntegrationKeyValueItem("private_key", request.PrivateKey));

            company.Integrations.Add(newIntegration);

            var rest = new RestAPI(newIntegration.SiteUrl + "/wp-json/wc/v3/", request.ClientKey, request.PrivateKey);
            var wc = new WCObject(rest);

            var orders = new List<WooCommerceNET.WooCommerce.v3.Order>();

            try
            {
                orders = await wc.Order.GetAll();
                newIntegration.ConnectionProblem = false;
            }
            catch (Exception e)
            {
                newIntegration.ConnectionProblem = true;
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(result) return  Result<Integration>.Success(newIntegration);

            return Result<Integration>.Failure("Problem while adding new integration to database");
        }
    }
}
