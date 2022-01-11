using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;

namespace Application.Integrations.Woocommerce
{
    public class GetLatestOrdersCommand : IRequest<Unit>
    {
    }
}
