using Application.Statuses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class StatusesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}
