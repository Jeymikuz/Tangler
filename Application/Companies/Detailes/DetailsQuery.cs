using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Companies.Detailes
{
    public class DetailsQuery: IRequest<Result<CompanyDto>>
    {
        
    }
}
