import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/customer';
import { CustomerService } from '../_services/customer/customer.service';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.scss']
})
export class AccountReviewsComponent implements OnInit {
  customer :Customer = new Customer();
  constructor(private customerService : CustomerService,private productService:ProductService) { }

  ngOnInit() {
    this.getReviews();
  }

  getReviews(){
   this.customerService.GetCustomer().subscribe(customer =>{ this.customer = customer;
     if (this.customer.reviews.length !== 0){
      this.customer.reviews.forEach(item => {
        this.productService.getProduct(item.product).subscribe(product => item.product = product)
      });
     }
   });
  }

}
