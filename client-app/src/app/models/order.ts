import { Address } from "./address";
import { Invoice } from "./invoice";
import { OrderProduct } from "./orderProduct";
import { PickUpPoint } from "./pickUpPoint";

export interface Order{
    id:number;
    clientLogin: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    phoneNumber: string | undefined;
    email:string | undefined;
    paymentMethod: string | undefined;
    deliveryMethod: string | undefined;
    deliveryAddress: Address | undefined;
    deliveryPrice: number | undefined;
    invoiceAddress: Address | undefined;
    pickUpPoint: PickUpPoint | undefined;
    invoice: Invoice | undefined;
    products: OrderProduct[] | undefined;
    clientMessage: string | undefined;
    statusId: string | undefined;
    orderedAt: string | undefined;
}

export interface NewOrder{
    clientLogin: string| undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;
    statusId: number
}