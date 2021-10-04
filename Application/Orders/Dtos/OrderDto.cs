using System.Collections.Generic;

namespace Application.Orders.Dtos
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
        decimal deliveryPrice,
        OrderAddressDto DeliveryAddress,
        OrderAddressDto InvoiceAddress,
        ICollection<OrderProductDto> products,
        string clientMessage,
        string statusId
        );
}
