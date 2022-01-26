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
            return HandleResult(await Mediator.Send(new EditCompanyCommand(){Dto = dto}));
        }


        [HttpGet]
        public async Task<IActionResult> Details()
        {
            return HandleResult(await Mediator.Send(new GetCompanyDetailsQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCompanyDto companyDto)
        {
            return HandleResult(await Mediator.Send(new CreateCompanyCommand { CompanyDto = companyDto }));
        }

        [HttpDelete]

        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteCompanyCommand { Id = id }));
        }
    }
}
