using Application.StatusesGroups.Create;
using Application.StatusesGroups.Edit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.StatusesGroups.Delete;

namespace API.Controllers
{
    public class StatusesGroupsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateStatusGroup(CreateGroupStatusDto dto)
        {
            return HandleResult(await Mediator.Send(new CreateCommand { Name = dto.name }));
        }

        [HttpPut]
        public async Task<IActionResult> EditStatusGroup(EditStatusGroupDto dto)
        {
            return HandleResult(await Mediator.Send(new EditCommand { Id = dto.id, Name = dto.name }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveStatusGroup([FromRoute]int id)
        {
            return HandleResult(await Mediator.Send(new DeleteCommand() {Id = id}));
        }
    }
}
