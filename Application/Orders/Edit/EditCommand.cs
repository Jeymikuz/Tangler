using Application.Core;
using Application.Orders.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Edit
{
    public class EditCommand : IRequest<Result<OrderDto>>
    {
        public OrderDto Order { get; set; }
    }
}
