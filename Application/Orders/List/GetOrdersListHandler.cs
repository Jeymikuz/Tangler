﻿using Application.Core;
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
    class GetOrdersListHandler : IRequestHandler<GetOrdersListQuery, Result<List<OrderDto>>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetOrdersListHandler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<OrderDto>>> Handle(GetOrdersListQuery request, CancellationToken cancellationToken)
        {
            var companie = await _context.Companies.Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.Status)
                                                    .Include(x => x.Orders).ThenInclude(o => o.Invoice).ThenInclude(x=>x.Address)
                                                    .Include(s => s.Statuses)
                                                    .Include(s => s.StatusesGroups).ThenInclude(x=>x.Statuses)
                                                    .SingleOrDefaultAsync(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername()));

            if (companie == null) return Result<List<OrderDto>>.Failure("Company not found");

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