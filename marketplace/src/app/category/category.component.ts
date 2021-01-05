import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '../_models/category';

import { Product, ProductPage } from '../_models/product';
import { SubCategory } from '../_models/subCategory';

import { CollapseComponent } from 'angular-bootstrap-md';
import { CategoryService } from '../_services/category/category.service';
import { ProductService } from '../_services/product/product.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,AfterViewInit {
  @ViewChild('sub') sub: CollapseComponent;
  category:Category=null;
  products:Product[]=[];
  subCategory:SubCategory;
  productPage :ProductPage;
  sort=0;
  
 sortTable = [{"id":0,"sort":"price","dir":"asc"},{"id":1,"sort":"price","dir":"des"},
 {"id":2,"sort":"designation","dir":"asc"},{"id":3,"sort":"designation","dir":"des"},]
  constructor(private categoryService: CategoryService,private productService:ProductService,
     private route: ActivatedRoute,private router:Router) {
     }

  ngOnInit() {
    this.change(0,'price','asc');
  }
  ngAfterViewInit() {
 //   setTimeout(()=>{  this.sub.toggle();}, 500);

}
readUrlParams(callback) {
  // Nest them together and
  this.route.queryParams.subscribe(queryParams => {
    this.route.params.subscribe(routeParams => {
      callback(routeParams, queryParams);
    });
  });
}
sorting(sort,dir){
  this.sort  = this.sortTable.find(x => x.sort === sort && x.dir === dir).id;
}
sortChange(){
  let sort =  this.sortTable.find(x => x.id == this.sort);
 this.change(0,sort.sort,sort.dir);
}
 change(page:number,sort:string,dir:string){
 
  this.readUrlParams((routeParams, queryParams) => {
    
    this.sorting(sort,dir);
    this.subCategory=null;
    //check if it's a category or a subCategory
    if(routeParams.type==='C'){
    //Category
    this.getCategory(routeParams.id,true,page,sort,dir) ;
    }
    else {
      //subCategory
      this.getSubCategory(routeParams.id,page,sort,dir);
    }
    
  });
  
 }
  getCategory(id:string,type:boolean,page:number,sort,dir): void {
      this.categoryService.getCategoryByPage(id,page,sort,dir)
    .subscribe(category =>{ this.category = category;
      setTimeout(()=>{ if(this.sub.isCollapsed){ this.sub.toggle();}}, 500);
      if(type){
        this.productPage = category.productsPage; 
        this.products = this.productPage.content
        
      }
    }
      );
  }
  //get subcategory by id
  getSubCategory(id:string,page:number,sort,dir): void {
    this.categoryService.getSubCategoryByPage(id,page,sort,dir)
    .subscribe(subCategory =>{this.subCategory = subCategory;
    this.getCategory(this.subCategory.category,false,0,sort,dir);
    this.productPage = subCategory.productsPage; 
    this.products=this.productPage.content;
    
    }
      );
  }

}
