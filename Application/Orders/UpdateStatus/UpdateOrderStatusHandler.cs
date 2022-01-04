using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper.Configuration.Annotations;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders.UpdateStatus
{
    public class UpdateOrderStatusHandler : IRequestHandler<UpdateOrderStatusCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateOrderStatusHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public async Task<Result<Unit>> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            var company = await  _context.Companies.Include(x => x.Orders)
                .ThenInclude(x => x.Status)
                .Include(x=>x.Statuses)
                .FirstOrDefaultAsync(x => x.Users.Any(u => u.UserName == _userAccessor.GetUsername()), cancellationToken: cancellationToken);
             
            if(company is null) return Result<Unit>.Failure("Order or status not found");

            var order = company.Orders.FirstOrDefault( x=> x.Id == request.OrderId);
            var status = company.Statuses.FirstOrDefault(s => s.Id == request.StatusId);

            order.Status = status;

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(result) return Result<Unit>.Success(Unit.Value);

            return  Result<Unit>.Failure("Problem with database");
        }
    }
}

