using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Companies.Create
{
    public class CreateCompanyCommand: IRequest<Result<Unit>>
    {
            public CreateCompanyDto CompanyDto { get; set; }
    }
}
