using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;
using Microsoft.VisualBasic.CompilerServices;

namespace API.DTOs
{
    public record NewIntegrationDto(string privateName,string siteUrl, string clientKey, string privateKey, IntegrationType type)
    {
    }
}
