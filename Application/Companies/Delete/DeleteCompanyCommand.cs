using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Companies.Delete
{
    public class DeleteCompanyCommand : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }

}
