import { Address } from "./address";

export interface Invoice{
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    address: Address;
    nip: string;
    isCreated: boolean;
}