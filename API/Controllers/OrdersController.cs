using Application.Orders.Create;
using Application.Orders.Detailes;
using Application.Orders.Dtos;
using Application.Orders.Edit;
using Application.Orders.List;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.DTOs;
using Application.Orders.UpdateStatus;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            return HandleResult(await Mediator.Send(new CreateCommand { orderDto=orderDto}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> OrderDetailes(int id)
        {
            return HandleResult(await Mediator.Send(new DetailesQuery { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> OrdersList([FromQuery]int statusId)
        {
            return HandleResult(await Mediator.Send(new ListQuery { Id = statusId }));
        }

        [HttpPut]
        public async Task<IActionResult> EditOrder(OrderDto order)
         {
            return HandleResult(await Mediator.Send(new EditCommand { Order = order}));
        }

        [HttpPost("updateStatus")]
        public async Task<IActionResult> UpdateOrderStatus(UpdateOrderStatusDto dto)
        {
            return HandleResult(await Mediator.Send(new UpdateOrderStatusCommand()
                {OrderId = dto.orderId, StatusId = dto.statusId}));
        }
    }
}
