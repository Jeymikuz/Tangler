using Application.Core;
using Application.Interfaces;
using Application.Orders.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.List
{
    class ListHandler : IRequestHandler<ListQuery, Result<List<OrderDto>>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ListHandler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<OrderDto>>> Handle(ListQuery request, CancellationToken cancellationToken)
        {
            var companie = await _context.Companies.Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.InvoiceAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(s => s.Statuses)
                                                    .SingleOrDefaultAsync(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername()));
            if (companie == null) return Result<List<OrderDto>>.Failure("Companie not found");

            if (request.Id == 0)
            {
                var orders = companie.Orders.ToList();
                var ordersDto = _mapper.Map<List<OrderDto>>(orders);
                return Result<List<OrderDto>>.Success(ordersDto);
            }
            if (request.Id > 0)
            {
                var orders = companie.Orders.Where(s => s.Status.Id == request.Id).ToList();
                var ordersDto = _mapper.Map<List<OrderDto>>(orders);
                return Result<List<OrderDto>>.Success(ordersDto);
            }
            return Result<List<OrderDto>>.Failure("Wrong status id");
        }
    }
}
