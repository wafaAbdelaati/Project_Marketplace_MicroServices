import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../_models/product';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { ProductService } from '../_services/product/product.service';
import { CartService } from '../_services/cart/cart.service';
import { OrderDetail } from '../_models/order';
import { CustomerService } from '../_services/customer/customer.service';
import { LoginService } from '../_services/login/login.service';
import { Review } from '../_models/review';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [NgbRatingConfig] 
})
export class ProductComponent implements OnInit {
  @ViewChild('basicModal') basicModal: any;
  @ViewChild('reviewModal') reviewModal: any;
  newReview:Review = new Review();
  product: Product = null;
  id:string;
  quantity :number=1;
  activeTab:number=0;
  constructor(config: NgbRatingConfig,private productService:ProductService, private route: ActivatedRoute,private router:Router,
    private customerService:CustomerService, private cartService:CartService, private loginService:LoginService ) {
      config.max=5;
     }
   
  ngOnInit() {
  
     this.route.params.subscribe(params =>{
      this.id = params['id'];

    } );
    this.getProduct(this.id) ;
  
  }
  change(state){
    this.activeTab = state;
  }
 /*  changeUrl(){
    var url;
    url = this.product.designation.split(' ').join('_');
     this.location.go( '/'+url );
    this.location.replaceState(Location.joinWithSlash('product',url));

  } */
  //get subcategory by id
  getProduct(id:string): void {
    this.productService.getProduct(id)
    .subscribe(product =>{this.product = product; 
      console.log(product)
    if(this.product.reviews.length!== 0){
      this.product.reviews.forEach(item=> {
        this.customerService.GetCustomerById(item.customer).subscribe(customer =>{
          item.customer=customer;
        })
      });
      this.productService.getProductReviewAverage(this.product.id).subscribe(average => this.product.review = average)
    }
    } );
  }
  addToCart() : void {
    let item = new OrderDetail(this.product.seller,this.id,this.quantity);
    this.basicModal.show();
    this.cartService.addToCart(item);
   
  }
  showReviewModal(): void {
    if(this.loginService.isLoggedIn()){
      this.newReview.note=0;
      this.newReview.comment="";
    this.reviewModal.show();}
    else {
      this.router.navigate(['/signup']);
    }
  }
  addReview(){
    var now = new Date().toJSON();
  this.newReview.product=this.product.id;
  this.newReview.customer=this.loginService.getCustomer().id;
  this.newReview.reviewDate=now;
  this.productService.addReview(this.newReview).subscribe(review =>{
    this.reviewModal.hide();
    this.ngOnInit();
  })
  }
}
