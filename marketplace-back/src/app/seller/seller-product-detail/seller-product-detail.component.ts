import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { CustomerService } from 'src/app/_services/customer/customer.service';
import { Feature } from 'src/app/_models/feature';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seller-product-detail',
  templateUrl: './seller-product-detail.component.html',
  styleUrls: ['./seller-product-detail.component.scss']
})
export class SellerProductDetailComponent implements OnInit {
 product:Product = new Product();
 public chartType: string = 'line';
 public chartDatasets: Array<any> = [ { data: [], label: 'Prix' }];
 public chartLabels: Array<any> = [];
 public chartColors: Array<any> = [{ backgroundColor: 'rgba(0, 137, 132, .2)',borderColor: 'rgba(0, 10, 130, .7)', borderWidth: 2,}];
 public chartOptions: any = {responsive: true};
 public chartClicked(e: any): void { }
 public chartHovered(e: any): void { }
  constructor(public datepipe: DatePipe, private customerService:CustomerService,private productService:ProductService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.getProduct();
  }
  readUrlParams(callback) {
    // Nest them together and
    this.route.queryParams.subscribe(queryParams => {
      this.route.params.subscribe(routeParams => {
        callback(routeParams, queryParams);
      });
    });
  }
 
  getProduct(){
    this.readUrlParams((routeParams, queryParams) => {
      let id = routeParams.id;
      this.productService.getProduct(id).subscribe(product=>{
        this.product=product;
        this.product.priceHistory.forEach(item=>{
          this.chartLabels.push(this.datepipe.transform(item.updateDate, 'fullDate'))
          this.chartDatasets[0].data.push(item.price)
        });
        if(this.product.reviews.length!== 0){
          this.product.reviews.forEach(item=> {
            this.customerService.GetCustomerById(item.customer).subscribe(customer =>{
              item.customer=customer;
            })
          });
          this.productService.getProductReviewAverage(id).subscribe(average=>this.product.review=average);
       }
      });
    });
  }

}
