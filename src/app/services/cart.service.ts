import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../comman/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined !;

    if (this.cartItem.length > 0) {
      //find the item in the cart based on item id

      for (let tempCartItem of this.cartItem) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // refactoring the above code with a builtin method on array
      // existingCartItem = this.cartItem.find(tempCartItem => tempCartItem.id === theCartItem.id);

      //check if we found it
      alreadyExistInCart = (existingCartItem != undefined);
    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number =0;

    for(let curentCartItem of this.cartItem){
      totalPriceValue += curentCartItem.quantity * curentCartItem.unitPrice;
      totalQuantityValue += curentCartItem.quantity;
    }

    //publish the new value ... all the subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
