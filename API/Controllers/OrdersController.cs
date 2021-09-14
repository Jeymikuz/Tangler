using Application.Dtos;
using Application.Orders;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { orderDto=orderDto}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> OrderDetailes(int id)
        {
            return HandleResult(await Mediator.Send(new Detailes.Query { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> OrdersList([FromQuery]int statusid)
        {
            return HandleResult(await Mediator.Send(new OrdersList.Query { Id = statusid }));
        }
    }
}
