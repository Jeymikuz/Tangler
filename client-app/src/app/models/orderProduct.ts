export interface OrderProduct{
    id: number;
    warehouseId: number;
    externalId: number;
    name: string;
    description: string;
    sku: string;
    ean: string;
    quantity: string;
    weight: number,
    price: number;
    img: string;
}