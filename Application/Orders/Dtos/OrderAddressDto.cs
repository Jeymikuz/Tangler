namespace Application.Orders.Dtos
{
    public record OrderAddressDto(
        string street,
        string zipcode,
        string city
        );
}
 