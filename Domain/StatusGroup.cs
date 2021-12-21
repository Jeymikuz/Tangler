using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class StatusGroup
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public string Name { get; set; }
        public List<Status> Statuses { get; set; } = new List<Status>();
    }
}
