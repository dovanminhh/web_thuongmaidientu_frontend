import { Component, OnInit } from '@angular/core';
import { cartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  host:string = 'http://localhost:8080/rest/admin/product/getImage/';
  cartItems: cartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetail();
  }

  listCartDetail(){
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => 
      this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: cartItem){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: cartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: cartItem){
    this.cartService.remove(theCartItem);
  }
  
}
