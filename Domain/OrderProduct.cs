using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class OrderProduct
    {
        public int Id { get; set; }
        public ulong? ExternalId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SKU { get; set; }
        public string EAN { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Price { get; set; }
        public double Weight { get; set; }
        public string Img { get; set; }
    }
}
