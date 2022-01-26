using Application.Statuses.Create;
using Application.Statuses.Delete;
using Application.Statuses.Edit;
using Application.Statuses.EditIndex;
using Application.Statuses.List;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class StatusesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            return HandleResult(await Mediator.Send(new GetStatusesListQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStatus(CreateStatusCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut]
        public async Task<IActionResult> EditStatus(Status status)
        {
            return HandleResult(await Mediator.Send(new EditStatusCommand {Status = status}));
        }

        [HttpPut("indexes")]
        public async Task<IActionResult> EditStatusesIndex(EditStatusIndexCommand dto)
        {
            return HandleResult(await Mediator.Send(dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatus(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteStatusCommand { Id = id }));
        }
    }
}
