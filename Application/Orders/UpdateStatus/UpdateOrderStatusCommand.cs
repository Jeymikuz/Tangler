using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Orders.UpdateStatus
{
    public class UpdateOrderStatusCommand : IRequest<Result<Unit>>
    {
        public int OrderId { get; set; }
        public int StatusId { get; set; }  
    }
}
