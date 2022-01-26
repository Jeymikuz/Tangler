using Application.Core;
using Domain;
using MediatR;

namespace Application.Statuses.Edit
{
    public class EditStatusCommand : IRequest<Result<Status>>
    {
        public Status Status { get; set; }
    }
}
