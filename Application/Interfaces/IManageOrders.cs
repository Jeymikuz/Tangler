using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface IManageOrders<T> where T: class, IManageOrders<T>
    {

        public Task DownloadLatestOrders();
        public Task<Order> UpdateOrder(Order order);
    }
}
