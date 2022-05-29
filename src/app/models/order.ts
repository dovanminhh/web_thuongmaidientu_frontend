import { Customer } from "./customer";

export class Order {
    id!: number;
    name!: String;
    email!: String;
    address!: String;
    phone!: String;
    status!: number;
    objCus!: Customer; 
    note!: String;
    created_date!: String;
}
