import { Address } from "./address";

export interface Invoice{
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
    nip: string;
}