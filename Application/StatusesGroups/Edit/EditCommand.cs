using Application.Core;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.StatusesGroups.Edit
{
    public class EditCommand : IRequest<Result<StatusGroup>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
