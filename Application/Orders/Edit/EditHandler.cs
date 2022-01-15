using Application.Core;
using Application.Interfaces;
using Application.Orders.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Edit
{
    public class EditHandler : IRequestHandler<EditCommand, Result<OrderDto>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EditHandler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<OrderDto>> Handle(EditCommand request, CancellationToken cancellationToken)
        {
            var name = _userAccessor.GetUsername();

            var order = await _context.Companies.AsNoTracking().Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.InvoiceAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(x=>x.Users)
                                                    .Include(s => s.Statuses).Where(x => x.Users.Any(y => y.UserName == name)).Select(y => y.Orders.FirstOrDefault(x => x.Id == request.Order.id)).FirstOrDefaultAsync();

            var company = await _context.Companies.AsNoTracking().Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.InvoiceAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(x => x.Users)
                                                    .Include(s => s.Statuses).Where(x=>x.Users.Any(y=>y.UserName == name)).ToListAsync();

            var order2 = company.Select(y => y.Orders.FirstOrDefault());
            var order3 = company.Select(y => y.Orders.FirstOrDefault(x=>x.Id == request.Order.id));
            var order4 = company.Select(y => y.Orders.FirstOrDefault(x=>x.Id == request.Order.id && y.Users.Any(u => u.UserName == _userAccessor.GetUsername())));

            var newStatus = await _context.Companies.Include(s => s.Statuses).Select(y => y.Statuses.FirstOrDefault(x => x.Id == int.Parse(request.Order.statusId))).FirstOrDefaultAsync();

            if (order is null) return Result<OrderDto>.Failure("Order not found");
            if (order is null) return Result<OrderDto>.Failure("Status not found");

            order = _mapper.Map<Order>(request.Order);
            order.Status = newStatus;

            _context.Update(order);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                var orderDto = _mapper.Map<OrderDto>(order);
                return Result<OrderDto>.Success(orderDto);
            }

            return Result<OrderDto>.Failure("Problem with database");
        }

        private void UpdateOrder(Order currentOrder, Order editedOrder)
        {
            currentOrder.ClientLogin = editedOrder.ClientLogin;
            currentOrder.FirstName = editedOrder.FirstName;
            currentOrder.LastName = editedOrder.LastName;
            currentOrder.PhoneNumber = editedOrder.PhoneNumber;
            currentOrder.Email = editedOrder.Email;
            currentOrder.PaymentMethod = editedOrder.PaymentMethod;
            currentOrder.DeliveryMethod = editedOrder.DeliveryMethod;

            currentOrder.DeliveryAddress.City = editedOrder.DeliveryAddress.City;
            currentOrder.DeliveryAddress.Street = editedOrder.DeliveryAddress.Street;
            currentOrder.DeliveryAddress.ZipCode = editedOrder.DeliveryAddress.ZipCode;

            currentOrder.InvoiceAddress.City = editedOrder.InvoiceAddress.City;
            currentOrder.InvoiceAddress.Street = editedOrder.InvoiceAddress.Street;
            currentOrder.InvoiceAddress.ZipCode = editedOrder.InvoiceAddress.ZipCode;
            currentOrder.Invoice.Name = editedOrder.Invoice.Name;
        }
    }
}
