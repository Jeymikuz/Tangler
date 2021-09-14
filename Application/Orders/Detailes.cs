﻿using Application.Core;
using Application.Dtos;
using Application.Interfaces;
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

namespace Application.Orders
{
    public static class Detailes
    {
        public class Query : IRequest<Result<OrderDto>>
        {
            public int Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<OrderDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var companie = await _context.Companies.Include(x=>x.Orders).ThenInclude(o=>o.Products)
                                                        .Include(x=>x.Orders).ThenInclude(o=>o.InvoiceAddress)
                                                        .Include(x=>x.Orders).ThenInclude(o=>o.DeliveryAddress)
                                                        .Include(s=>s.Statuses)
                                                        .SingleOrDefaultAsync(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername()));
                if (companie == null) return Result<OrderDto>.Failure("Companie not found");

                var orderDto = _mapper.Map<OrderDto>(companie.Orders.SingleOrDefault(x => x.Id == request.Id));

                if (orderDto == null) return Result<OrderDto>.Failure("Order not found");

                return Result<OrderDto>.Success(orderDto);
            }
        }
    }
}