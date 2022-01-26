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

namespace Application.Orders.EditProduct
{
    public class EditOrderProductHandler : IRequestHandler<EditOrderProductCommand, Result<OrderDto>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EditOrderProductHandler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<OrderDto>> Handle(EditOrderProductCommand request, CancellationToken cancellationToken)
        {
            var order = await _context.Companies.AsNoTracking().Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.InvoiceAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(s => s.Statuses)
                                                    .Select(y => y.Orders.FirstOrDefault(x => x.Id == request.Id && y.Users.Any(u => u.UserName == _userAccessor.GetUsername())))
                                                    .FirstOrDefaultAsync();





            throw new NotImplementedException();
        }
    }
}
