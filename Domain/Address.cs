using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Address
    {
        public Guid Id { get; set; }
        public string MainAddress { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
    }
}
