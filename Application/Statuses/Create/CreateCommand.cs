using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Statuses.Create
{
    public class CreateCommand : IRequest<Result<Unit>>
    {
        public string Name { get; set; }
        public string Color { get; set; }
    }
}
