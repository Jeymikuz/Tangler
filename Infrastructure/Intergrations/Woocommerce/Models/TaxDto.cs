using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Intergrations.Woocommerce.Models
{
    public class TaxDto
    {
        public int id { get; set; }
        public string total { get; set; }
        public string subtotal { get; set; }
    }
}
