using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.StatusesGroups.Delete
{
    public class DeleteStatusGroupCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }
}
