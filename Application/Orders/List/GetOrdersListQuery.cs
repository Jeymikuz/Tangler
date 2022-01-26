using Application.Core;
using Application.Orders.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.List
{
    public class GetOrdersListQuery : IRequest<Result<List<OrderDto>>>
    {
        public int Id { get; set; }
    }
}
