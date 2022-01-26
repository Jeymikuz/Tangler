using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Statuses.Delete
{
    public class DeleteStatusCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
}
