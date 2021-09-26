using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Companies.Create
{
    public class CreateCommand: IRequest<Result<Unit>>
    {
            public CreateDto CompanyDto { get; set; }
    }
}
