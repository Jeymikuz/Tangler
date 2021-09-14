using Application.Dtos;
using Application.Orders;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<OrderProductDto, OrderProduct>();
            CreateMap<OrderProduct,OrderProductDto>();

            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto,Address>();

            CreateMap<OrderDto, Order>()
                .ForMember(x => x.Status, a => a.Ignore());

            CreateMap<Order, OrderDto>()
                .ForMember(x => x.statusId, a => a.MapFrom(s => s.Status.Id))
                .ForMember(x => x.products, a => a.MapFrom(s => s.Products));
        }
    }
}
