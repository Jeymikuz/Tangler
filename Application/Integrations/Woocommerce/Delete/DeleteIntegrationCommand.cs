using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Integrations.Woocommerce.Delete
{
    public class DeleteIntegrationCommand : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }
}
