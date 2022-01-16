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
    public class DetailsHandler : IRequestHandler<DetailsQuery, Result<CompanyDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public DetailsHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<CompanyDto>> Handle(DetailsQuery request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.Users.Any(y => y.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            if(company is null) return Result<CompanyDto>.Failure("Company not found");

            var dto = new CompanyDto(company.Name, company.Address, company.NIP);


            return Result<CompanyDto>.Success(dto);
        }
    }
}
