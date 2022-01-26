using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies.Detailes
{
    public class GetCompanyDetailsHandler : IRequestHandler<GetCompanyDetailsQuery, Result<CompanyDetailsDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public GetCompanyDetailsHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<CompanyDetailsDto>> Handle(GetCompanyDetailsQuery request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.Users.Any(y => y.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            if(company is null) return Result<CompanyDetailsDto>.Failure("Company not found");

            var dto = new CompanyDetailsDto(company.Name, company.Address, company.NIP);


            return Result<CompanyDetailsDto>.Success(dto);
        }
    }
}
