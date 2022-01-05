using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Dtos
{
    public record InvoiceDto(string id, string firstName, string lastName, OrderAddressDto address, string nip)
    {
    };
}
