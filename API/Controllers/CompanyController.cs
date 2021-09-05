using Application.Companies;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CompanyController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create(CompanyDto companyDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { companyDto = companyDto }));
        }

        [HttpDelete]

        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
