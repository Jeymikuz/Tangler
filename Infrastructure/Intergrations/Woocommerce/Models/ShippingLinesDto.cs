using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Intergrations.Woocommerce.Models
{
    public class ShippingLinesDto
    {
        public int id { get; set; }
        public string method_title { get; set; }
        public string method_id { get; set; }
        public string total { get; set; }
        public string total_tax { get; set; }
        public TaxDto[] taxes { get; set; }
        public MetaDataDto[] meta_data { get; set; }
    }


}
