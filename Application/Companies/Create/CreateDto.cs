using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Companies.Create
{
    public record CreateDto(
        string name,
        string nip,
        string email,
        string password,
        string displayName
        );
}
