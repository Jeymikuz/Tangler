using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string NIP { get; set; }
        public virtual ICollection<AppUser> Users { get; set; } = new List<AppUser>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<Status> Statuses { get; set; } = new List<Status>();
        public virtual ICollection<StatusGroup> StatusesGroups { get; set; } = new List<StatusGroup>();
        public bool IsDeleted { get; set; }
        public virtual ICollection<Integration> Integrations { get; set; } = new List<Integration>();
    }
}
