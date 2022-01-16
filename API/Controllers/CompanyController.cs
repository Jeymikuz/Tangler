using Application.Companies.Create;
using Application.Companies.Delete;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Companies.Detailes;
using Application.Companies.EditInfo;

namespace API.Controllers
{
    public class CompanyController : BaseApiController
    {

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]CompanyEditInfoDto dto)
        {
            return HandleResult(await Mediator.Send(new EditInfoCommand(){Dto = dto}));
        }


        [HttpGet]
        public async Task<IActionResult> Details()
        {
            return HandleResult(await Mediator.Send(new DetailsQuery()));
        }

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
