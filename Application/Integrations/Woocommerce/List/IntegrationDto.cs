using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Integrations.Woocommerce.List
{
    public record IntegrationDto(string id, string privateName, string siteUrl, IntegrationType type, bool connectionProblem)
    {
        
    }
}
