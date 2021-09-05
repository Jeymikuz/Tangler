using Application.Core;
using MediatR;
using Persistence;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Application.Companies
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CompanyDto companyDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = new Company
                {
                    Name = request.companyDto.Name,
                    NIP = request.companyDto.NIP,
                };

                var user = new AppUser
                {
                    Email = request.companyDto.Email,
                    DisplayName = request.companyDto.Email,
                    UserName = request.companyDto.Email,
                };

                var isSuccess = await _userManager.CreateAsync(user, request.companyDto.Password);

                if (!isSuccess.Succeeded) return Result<Unit>.Failure("Failed add new user with company");

                company.Users.Add(user);

                await _context.Companies.AddAsync(company);

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to add company to database");
            }
        }
    }
}
