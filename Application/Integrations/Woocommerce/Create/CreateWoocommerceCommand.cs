using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;

namespace Application.Integrations.Woocommerce.Create
{
    public class CreateWoocommerceCommand : IRequest<Result<Integration>>
    {
        public string SiteUrl { get; set; }
        public string ClientKey { get; set; }
        public string PrivateKey { get; set; }
        public string PrivateName { get; set; }

    }
}
