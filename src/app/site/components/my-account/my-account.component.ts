import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItem } from 'src/app/models/cartItem';
import { Customer } from 'src/app/models/customer';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userInfor : any;
  customerInfor: any = sessionStorage.getItem('customer-login');
  customer = JSON.parse(this.customerInfor);

  cartItems: cartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private fb: FormBuilder, private _cartService: CartService) { }

  ngOnInit(): void {
    this.userInfor = sessionStorage.getItem('customer-login');
  }

  logOut(){
    sessionStorage.removeItem('customer-login');
    this.router.navigate(['/login']);
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

  insertCheckout(){}
  
}
