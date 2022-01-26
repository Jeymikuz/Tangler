﻿using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Companies.Delete
{
    public class DeleteCompanyHandler : IRequestHandler<DeleteCompanyCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public DeleteCompanyHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.FindAsync(Guid.Parse(request.Id));

            if (company == null) return Result<Unit>.Failure("Company does not exists");

            company.IsDeleted = true;

            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem with saving to database");
        }
    }
}
