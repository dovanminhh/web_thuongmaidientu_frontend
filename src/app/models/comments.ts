import { Customer } from "./customer";
import { Product } from "./product";

export class Comments {
    id!: number;
    note!: String;
    start!: number;
    status!: number;
    objCus!: Customer;
    objProduct!: Product;
    created_date!: Date
}
