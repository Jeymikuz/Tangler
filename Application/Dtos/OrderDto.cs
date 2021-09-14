using Application.Companies;
using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public record OrderDto(
        int id,
        string clientLogin,
        string firstName,
        string lastName,
        string phoneNumber,
        string email,
        string paymentMethod,
        string deliveryMethod,
        AddressDto DeliveryAddress,
        AddressDto InvoiceAddress,
        ICollection<OrderProductDto> products,
        string clientMessage,
        string statusId
        );
}
