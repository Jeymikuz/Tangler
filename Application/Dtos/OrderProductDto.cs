using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public record OrderProductDto(
        int id,
        string name,
        string description,
        string sku,
        string ean,
        int quantity
        );
}
