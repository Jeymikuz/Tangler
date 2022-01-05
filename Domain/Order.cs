using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Domain
{
    public class Order
    {
        public int Id { get; set; }
        public string ClientLogin { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string PaymentMethod { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal DeliveryPrice { get; set; }
        public Address DeliveryAddress { get; set; }
        public Address InvoiceAddress { get; set; }
        public Invoice Invoice { get; set; }
        public PickUpPoint PickUpPoint { get; set; }
        public virtual ICollection<OrderProduct> Products { get; set; }
        public string ClientMessage { get; set; }
        public Status Status { get; set; }
        public DateTime OrderedAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
