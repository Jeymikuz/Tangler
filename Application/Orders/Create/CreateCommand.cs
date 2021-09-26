using Application.Core;
using Application.Orders.Dtos;
using MediatR;

namespace Application.Orders.Create
{
    public class CreateCommand : IRequest<Result<OrderDto>>
    {
        public OrderDto orderDto { get; set; }
    }
}
