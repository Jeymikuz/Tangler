import { Address } from "./address";
import { OrderProduct } from "./orderProduct";

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
    invoiceAddress: Address | undefined;
    products: OrderProduct[] | undefined;
    clientMessage: string | undefined;
    statusId: string | undefined;
}

export interface NewOrder{
    clientLogin: string| undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;
    statusId: number
}