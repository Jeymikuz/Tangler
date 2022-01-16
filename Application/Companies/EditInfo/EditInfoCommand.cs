using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Companies.EditInfo
{
    public class EditInfoCommand : IRequest<Result<Unit>>
    {
        public CompanyEditInfoDto Dto { get; set; }
    }
}
