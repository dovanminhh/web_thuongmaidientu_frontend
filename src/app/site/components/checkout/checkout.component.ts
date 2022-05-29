import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/models/cartItem';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  customerInfor: any = sessionStorage.getItem('customer-login');
  customer = JSON.parse(this.customerInfor);
  product: Product = new Product();

  customeres: Customer = new Customer();
  cartItems: cartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private orderService: OrderService, private _cartService: CartService, private orderDetailSerive: OrderDetailService, private productService: ProductService, private _router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cartDetails();
    console.log(this.customer);
  }

  formcus = this.fb.group({
    name: [this.customer.name],
    address: [this.customer.address],
    email: [this.customer.email],
    phone: [this.customer.phone],
    note: [''],
  })

  cartDetails() {
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this._cartService.computeCartTotals();
  }

  insertCheckout(): void {
    this.order.objCus = this.customer;
    this.order.name = this.formcus.controls['name'].value;
    this.order.address = this.formcus.controls['address'].value;
    this.order.email = this.formcus.controls['email'].value;
    this.order.phone = this.formcus.controls['phone'].value;
    this.order.note = this.formcus.controls['note'].value;


    this.orderService.createOrder(this.order).subscribe(
      (response: Order) => {
        console.log(response);
        for (let index = 0; index < this.cartItems.length; index++) {
          this.orderDetail.objOrd = response;
          // console.log(this.cartItems[index].id);
          this.productService.getProductById(this.cartItems[index].id).subscribe(data => {
            this.orderDetail.objPro = data;
            this.orderDetail.total_price = this.cartItems[index].price;
            this.orderDetail.quantity = this.cartItems[index].quantity;
            this.orderDetailSerive.createOrderDetail(this.orderDetail).subscribe(data => {
              this.orderDetail.total_price = this.cartItems[index].price;
              this.orderDetail.quantity = this.cartItems[index].quantity;
              this.orderDetail.objOrd = response;
            })
          })
        }

        // console.log(this.orderDetail);
        this._router.navigate(['/shop']);
        this.resetCart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  resetCart() {
    this._cartService.cartItems = [];
    this._cartService.totalPrice.next(0);
    this.customerInfor.totalQuantity.next(0);
    this.formcus.reset();
  }
}
