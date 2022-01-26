using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies.EditInfo
{
    public class EditCompanyHandler : IRequestHandler<EditCompanyCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public EditCompanyHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(EditCompanyCommand request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.Users.Any(y => y.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);

            if(company is null) return Result<Unit>.Failure("Company not found");

            company.Name = request.Dto.name;
            company.NIP = request.Dto.nip;

            if (company.Address is null) company.Address = new Address();
            company.Address.City = request.Dto.address.City;
            company.Address.ZipCode = request.Dto.address.ZipCode;
            company.Address.Street= request.Dto.address.Street;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(result) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem with database");
        }
    }
}
