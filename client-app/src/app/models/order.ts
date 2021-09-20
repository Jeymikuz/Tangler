import { Address } from "./address";
import { OrderProduct } from "./orderProduct";

export interface Order{
    id:number;
    clientLogin: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email:string;
    paymentMethod: string;
    deliveryMethod: string;
    deliveryAddress: Address;
    invoiceAddress: Address;
    products: OrderProduct[];
    clientMessage: string;
    statusId: string;
}