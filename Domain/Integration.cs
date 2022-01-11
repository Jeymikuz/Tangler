using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain
{
    public class Integration
    {
        public Guid Id { get; set; }
        public IntegrationType IntegrationType { get; set; }
        public virtual ICollection<IntegrationKeyValueItem> ClientKeys { get; set; }
        public string PrivateName { get; set; }
        public string SiteUrl { get; set; }
        public bool ConnectionProblem { get; set; } = false;
    }
}
