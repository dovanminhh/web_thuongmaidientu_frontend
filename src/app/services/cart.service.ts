
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem } from '../models/cartItem';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartItems: cartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // Session storage for cart items
  storage: Storage = sessionStorage; 

  constructor(private httpClient: HttpClient) {
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '{}')?
    JSON.parse(sessionStorage.getItem('cartItems') || '{}') : [];
  }
  
  persistCartItems() {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem: cartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: any;
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += (currentCartItem.quantity * currentCartItem.price);
      totalQuantityValue += (currentCartItem.quantity);
    }
    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // we should update the sessionStorage variable value to reflect this.
    this.persistCartItems();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    // console.log('Cart Contents: ');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.price;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, 
        unitPrice=${tempCartItem.price}, subTotalPrice=${subTotalPrice}`
      );
    }
    // console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    // console.log('------');
  }

  decrementQuantity(theCartItem: cartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: cartItem) {
    // get index of CartItem in the array, if not found itemIndex will return -1
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
  
}
