import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart/cart.service';
import { Cart } from '../_models/order';
import { ProductService } from '../_services/product/product.service';
import { SellerService } from '../_services/seller/seller.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart :Cart;
  constructor(private cartService : CartService,private productService:ProductService,private sellerService : SellerService) { }
  
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.getProducts();
  }
  getProducts(){
    this.cart.amount=0;
    this.cart.details.forEach(item => {
      this.productService.getProduct(item.product).subscribe(product =>{
         item.product = product
         this.cart.amount = this.cart.amount + (item.quantity * item.product.price);
        })
       this.sellerService.getSeller(item.seller).subscribe(seller => {
         item.seller = seller;
       })

    });
     
  }
  updateCart(idProduct:string,qte){
    let cart = this.cartService.getCart();
    let index = cart.details.findIndex(x => x.product === idProduct);
    cart.details[index].quantity = qte;
    this.cartService.initCart(cart);
    this.ngOnInit();
    
  }
  deleteItem(idProduct:string){
    let cart = this.cartService.getCart();
    let index = cart.details.findIndex(x => x.product === idProduct);
    cart.details.splice(index,1);
    this.cartService.initCart(cart);
    this.ngOnInit();
  }

}
