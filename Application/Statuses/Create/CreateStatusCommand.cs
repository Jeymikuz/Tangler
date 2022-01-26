using Application.Core;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Statuses.Create
{
    public class CreateStatusCommand : IRequest<Result<Status>>
    {
        public int GroupId { get; set; }
        public Status Status { get; set; }
    }
}
