import { Category } from "./category";

export class Product {
    id!: number;
    name!: String;
    image!: String;
    quantity!: number;
    price!: number;
    sale_price!: number;
    description!: String;
    insurance!: String;
    status!: number;
    created_date!: Date;
    objCat!: Category;
}
