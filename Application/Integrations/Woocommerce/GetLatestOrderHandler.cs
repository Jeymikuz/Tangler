using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Integrations.Services;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Integrations.Woocommerce
{
    public class GetLatestOrderHandler:IRequestHandler<GetLatestOrdersCommand, Unit>
    {
        private readonly IManageOrders<WoocommerceService> _wService;

        public GetLatestOrderHandler(IManageOrders<WoocommerceService> wService)
        {
            _wService = wService;
        }

        public async Task<Unit> Handle(GetLatestOrdersCommand request, CancellationToken cancellationToken)
        {

            await _wService.DownloadLatestOrders();

            return Unit.Value;
        }
    }
}
