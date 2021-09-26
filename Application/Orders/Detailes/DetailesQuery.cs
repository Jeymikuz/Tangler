using Application.Core;
using Application.Orders.Dtos;
using MediatR;

namespace Application.Orders.Detailes
{
    public class DetailesQuery : IRequest<Result<OrderDto>>
    {
        public int Id { get; set; }
    }
}
