import { Order } from "./order";
import { Product } from "./product";

export class OrderDetail {
    id!: number;
    objOrd!: Order;
    objPro!: Product;
    quantity!: number;
    total_price!: number;
}
