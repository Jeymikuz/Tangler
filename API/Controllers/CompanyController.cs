using Application.Companies.Create;
using Application.Companies.Delete;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CompanyController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateDto companyDto)
        {
            return HandleResult(await Mediator.Send(new CreateCommand { CompanyDto = companyDto }));
        }

        [HttpDelete]

        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteCommand { Id = id }));
        }
    }
}
