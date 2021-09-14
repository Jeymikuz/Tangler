using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public record CompanyDto(
        string name,
        string nip,
        string email,
        string password,
        string displayName
        );
}
