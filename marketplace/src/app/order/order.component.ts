import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../_services/cart/cart.service';
import { Cart, Order } from '../_models/order';
import { ProductService } from '../_services/product/product.service';
import { SellerService } from '../_services/seller/seller.service';
import { LoginService } from '../_services/login/login.service';
import { OrderService } from '../_services/order/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('frame') basicModal: any;
  available :boolean=true;
  product:string=""
  cart :Cart;
  constructor(private orderService :OrderService,private loginService:LoginService,
    private cartService : CartService,private productService:ProductService,
    private sellerService : SellerService,public router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.getProducts();
  }
  getProducts(){
    this.cart.amount=0;
    this.cart.details.forEach(item => {
      this.productService.getProduct(item.product).subscribe(product =>{
         item.product = product
         item.approvedPrice=product.price;
         item.suggestedPrice=product.price;
         this.cart.amount = this.cart.amount + (item.quantity * item.product.price);
        })
       this.sellerService.getSeller(item.seller).subscribe(seller => {
         item.seller = seller;
       })

    });
     
  }

  validate(){
    let customer = this.loginService.getCustomer();
    var now = new Date().toJSON();
    let order = new Order(customer.id,now,"progress");
    order.details = this.cart.details;
    order.details.forEach(element => {
      if(element.quantity > element.product.quantity){this.available=false;this.product+=element.product+",";}
      else {
        this.productService.updateProductQuantity(element.product.id,element.quantity).subscribe(product=>{});
        element.product = element.product.id;element.seller = element.seller.id;element.state="progress";
        }
  });
  if(this.available){
    this.orderService.saveOrder(order).subscribe(order=> {
      this.cartService.deleteCart();this.router.navigate(["/account/orders"]);

    });}
    else{
     this.basicModal.show();
    }
  }

}
