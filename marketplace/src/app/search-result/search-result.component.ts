import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Category } from '../_models/category';
import { CategoryService } from '../_services/category/category.service';
import { Product, ProductPage } from '../_models/product';
import { SubCategory } from '../_models/subCategory';
import { ProductService } from '../_services/product/product.service';
import { isString } from 'util';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  navigationSubscription
  category:Category=null;
  products:Product[]=[];
  categories:Category[]=[];
  subCategory:SubCategory;
  productPage :ProductPage;
  keyword=null;
  constructor(private categoryService: CategoryService,private productService:ProductService, private route: ActivatedRoute) {
   
   }
 
  ngOnInit() {
    this.change(0);
    
    
  }
  readUrlParams(callback) {
    // Nest them together and
    this.route.queryParams.subscribe(queryParams => {
      this.route.params.subscribe(routeParams => {
        callback(routeParams, queryParams);
      });
    });
  }
  change(page:number){
    this.readUrlParams((routeParams, queryParams) => {
      this.category = null;this.categories= [];
      this.keyword=routeParams.keyword;
      this.categoryService.getCategoriesByKeyword(routeParams.keyword).subscribe(categories => { 
        this.categories = categories;
       });
      if (queryParams.category == undefined){
      this.productService.searchProducts(routeParams.keyword,page).subscribe(productPage =>{
        this.productPage= productPage;
        (this.productPage != null)?this.products= this.productPage.content:this.products=[];

       } );}
       else {
        this.categoryService.getCategoryByPageAndKeyword(routeParams.keyword,queryParams.category,page).subscribe(category => { 
          this.category = category;
          (this.category != null)?this.productPage= category.productsPage:this.productPage=null;
          (this.productPage != null)?this.products= this.productPage.content:this.products=[];
         })
       }
    });
    
    
  }
  
}
