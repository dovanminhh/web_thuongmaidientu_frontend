import { Product } from "./product";

export class cartItem{
    id!: number;
    name!: String;
    image!: String;
    price!: number;
    quantity!: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.image = product.image;
        this.price = product.price;

        this.quantity = 1;

    }
}