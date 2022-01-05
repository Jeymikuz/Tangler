using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Dtos
{
    public record PickUpPointDto(string id, string name, string pointId, OrderAddressDto address)
    {
    }
}
