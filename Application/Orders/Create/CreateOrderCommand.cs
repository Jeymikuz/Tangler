using Application.Core;
using Application.Orders.Dtos;
using MediatR;

namespace Application.Orders.Create
{
    public class CreateOrderCommand : IRequest<Result<OrderDto>>
    {
        public OrderDto orderDto { get; set; }
    }
}
