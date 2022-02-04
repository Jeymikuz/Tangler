using API.DTOs;
using Application.Orders.Dtos;
using AutoMapper;
using Domain;
using Persistence;

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
                .ForMember(x => x.products, a => a.MapFrom(s => s.Products))
                .ForMember(x => x.invoice, a => a.MapFrom(c => c.Invoice))
                .ForMember(x => x.pickUpPoint, a => a.MapFrom(c => c.PickUpPoint))
                .ForMember(x => x.orderedAt, a => a.MapFrom(b => b.OrderedAt.ToString("dd-MM-yyyy hh:mm")));

            CreateMap<NewOrderDto, Order>()
                .ForMember(x => x.Status, a => a.Ignore());
            

            CreateMap<Invoice, InvoiceDto>()
                .ForMember(x => x.id, a => a.MapFrom(b => b.Id))
                .ForMember(x => x.address, a => a.MapFrom(b => b.Address))
                .ForMember(x => x.firstName, a => a.MapFrom(b => b.FirstName))
                .ForMember(x => x.lastName, a => a.MapFrom(b => b.LastName))
                .ForMember(x => x.nip, a => a.MapFrom(b => b.NIP));
            CreateMap<InvoiceDto, Invoice>();

            CreateMap<PickUpPoint, PickUpPointDto>();
            CreateMap<PickUpPointDto, PickUpPoint>();

        }
    }
}
