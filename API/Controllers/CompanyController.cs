using Application.Companies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CompanyController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create(string CompanyName)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Name = CompanyName }));
        }
    }
}
