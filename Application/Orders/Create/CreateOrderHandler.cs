using Application.Core;
using Application.Interfaces;
using Application.Orders.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Create
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Result<OrderDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public CreateOrderHandler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<OrderDto>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = _mapper.Map<Order>(request.orderDto);

            var companie = await _context.Companies.Include(x => x.Statuses).SingleOrDefaultAsync(x => x.Users.Any(n => n.UserName == _userAccessor.GetUsername()));
            if (companie == null) return Result<OrderDto>.Failure("Companie not found");

            var status = companie.Statuses.SingleOrDefault(x => x.Id == Convert.ToInt32(request.orderDto.statusId));
            if (status == null) return Result<OrderDto>.Failure("Status not found");

            order.Status = status;

            companie.Orders.Add(order);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                var orderDto = _mapper.Map<OrderDto>(order);
                return Result<OrderDto>.Success(orderDto);
            }
            return Result<OrderDto>.Failure("Problem with database");
        }
    }
}
