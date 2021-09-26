using Application.Orders.Dtos;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<OrderProductDto, OrderProduct>();
            CreateMap<OrderProduct,OrderProductDto>();

            CreateMap<Address, OrderAddressDto>();
            CreateMap<OrderAddressDto,Address>();

            CreateMap<OrderDto, Order>()
                .ForMember(x => x.Status, a => a.Ignore());

            CreateMap<Order, OrderDto>()
                .ForMember(x => x.statusId, a => a.MapFrom(s => s.Status.Id))
                .ForMember(x => x.products, a => a.MapFrom(s => s.Products));
        }
    }
}
