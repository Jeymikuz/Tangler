namespace Application.Orders.Dtos
{
    public record OrderProductDto(
        int id,
        string name,
        string description,
        string sku,
        string ean,
        int quantity
        );
}
