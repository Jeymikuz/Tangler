using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class PickUpPoint
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PointId { get; set; }
        public Address Address { get; set; }
    }
}
