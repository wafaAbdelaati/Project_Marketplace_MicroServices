import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'src/app/_models/order';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(private cookieService: CookieService) { }

  initCart(cart){
    this.cookieService.set('cart',JSON.stringify(cart),60);
    
  }
  deleteCart(){
    this.cookieService.delete('cart');
  }
  cartExist():Boolean{
    return this.cookieService.check('cart');
    
  }
  getCart():Cart{
    if(this.cartExist()){
    return new Cart(JSON.parse(this.cookieService.get('cart')));
    }
    else { return new Cart();}
  }
  addToCart(item){
    let cart = this.getCart();
    let index = cart.details.findIndex(x => x.product === item.product);
   (index === -1)?cart.details = [...cart.details, item]:cart.details[index].quantity += item.quantity;
    this.initCart(cart);
  }
}
