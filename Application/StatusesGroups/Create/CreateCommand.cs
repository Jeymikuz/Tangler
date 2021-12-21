using Application.Core;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StatusesGroups.Create
{
    public class CreateCommand : IRequest<Result<StatusGroup>>
    {
        public string Name { get; set; }
    }
}
