using Application.Core;
using Application.Interfaces;
using Application.Orders.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Orders.Detailes
{
    public class DetailesHandler : IRequestHandler<DetailesQuery, Result<OrderDto>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DetailesHandler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
        {
            _userAccessor = userAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<OrderDto>> Handle(DetailesQuery request, CancellationToken cancellationToken)
        {
            var companie = await _context.Companies.Include(x => x.Orders).ThenInclude(o => o.Products)
                                                    .Include(x => x.Orders).ThenInclude(o => o.InvoiceAddress)
                                                    .Include(x => x.Orders).ThenInclude(o => o.DeliveryAddress)
                                                    .Include(s => s.Statuses)
                                                    .SingleOrDefaultAsync(x => x.Users.Any(x => x.UserName == _userAccessor.GetUsername()));
            if (companie == null) return Result<OrderDto>.Failure("Companie not found");

            var orderDto = _mapper.Map<OrderDto>(companie.Orders.SingleOrDefault(x => x.Id == request.Id));

            if (orderDto == null) return Result<OrderDto>.Failure("Order not found");

            return Result<OrderDto>.Success(orderDto);
        }
    }
}
