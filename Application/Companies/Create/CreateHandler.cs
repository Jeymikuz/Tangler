using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Companies.Create
{
    public class CreateHandler : IRequestHandler<CreateCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public CreateHandler(DataContext context, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<Result<Unit>> Handle(CreateCommand request, CancellationToken cancellationToken)
        {
            var company = new Company
            {
                Name = request.CompanyDto.name,
                NIP = request.CompanyDto.nip,
            };

            var user = new AppUser
            {
                Email = request.CompanyDto.email,
                DisplayName = request.CompanyDto.email,
                UserName = request.CompanyDto.email,
            };

            var isSuccess = await _userManager.CreateAsync(user, request.CompanyDto.password);

            if (!isSuccess.Succeeded) return Result<Unit>.Failure("Failed add new user with company");

            company.Users.Add(user);

            await _context.Companies.AddAsync(company);

            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to add company to database");
        }
    }
}
