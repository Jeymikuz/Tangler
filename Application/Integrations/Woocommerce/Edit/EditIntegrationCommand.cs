using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Integrations.Woocommerce.Edit
{
    public class EditIntegrationCommand : IRequest<Result<Unit>>
    {
        public EditIntegrationDto Dto { get; set; }
    }
}
