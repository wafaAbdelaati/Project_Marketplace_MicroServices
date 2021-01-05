import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product/product.service';
import { ProductPage, Product } from 'src/app/_models/product';
import { SellerService } from 'src/app/_services/seller/seller.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
 productPage:ProductPage = new ProductPage();
 selectedproduct:Product = new Product();
 arr;
  constructor(private productService:ProductService,private sellerService:SellerService) { }

  ngOnInit() {
    this.getProductPage(0);
  }
  getProductPage(page){
    this.productService.getProductsByPage(page).subscribe(productPage=>{
      this.productPage=productPage;
      this.productPage.content.forEach(product => {
        this.sellerService.getSeller(product.seller).subscribe(seller=>{
          product.seller=seller;
        })
        this.productService.getProductReviewAverage(product.id).subscribe(average => product.review = average)
      });
      console.log(this.productPage)
    });
  }
  home(id,inHome){
    this.productService.addProductToHome(id,inHome).subscribe(product=>{
      console.log(product);
      this.getProductPage(this.productPage.number);
    });
  }
  getArray(number){
    this.arr = new Array(number as number).fill(0).map((x,i)=>i);
    console.log(this.arr);
    return  this.arr;
  }

}
