import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPage, Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product/product.service';
import { SellerService } from 'src/app/_services/seller/seller.service';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category/category.service';
import { SubCategory } from 'src/app/_models/subCategory';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit {
  searchForm={'advancedSearch':false,'keyword':"",'category':'0','subCategory':'0'}
  productPage:ProductPage = new ProductPage();
  categories:any[]=[];
  subCategories:any[]=[];
  all=true;
  selectedProduct:Product= new Product();
  constructor(private productService:ProductService,private categoryService:CategoryService) { }

  ngOnInit() {
    this.getProductPage(0);
    this.getSearchCategories();
  }
  getAll(page){
    this.productService.getSellerProductsByPage(page).subscribe(productPage=>{
      this.productPage=productPage;
      this.productPage.content.forEach(product => {
        this.productService.getProductReviewAverage(product.id).subscribe(average => product.review = average)
      });
    });
  }
  getFilterd(page){
    this.productService.searchProductsByPage(this.searchForm.keyword,page,this.searchForm.category,this.searchForm.subCategory).subscribe(
      productPage=>{this.productPage = productPage
        this.productPage.content.forEach(product => {
          this.productService.getProductReviewAverage(product.id).subscribe(average => product.review = average)
        });
       }
    )
  }
  getProductPage(page){
     (this.all)?this.getAll(page):this.getFilterd(page);
    
  }
  getSearchCategories(){
      this.productService.getSellerProducts().subscribe(products=>{
        this.getCategoriesByIds(products.map(item =>{ return item.category; }));
        this.getSubCategoriesByIds( products.map(item =>{ return item.subCategory; }));
      })
  }
  getCategoriesByIds(list:string[]){
    this.categoryService.getCategoriesByIds(list.toString()).subscribe(categories=>{
      this.categories = categories;
    });
  }
  getSubCategoriesByIds(list){
    this.categoryService.getSubCategoriesByIds(list.toString()).subscribe(subcategories=>{
      this.subCategories = subcategories;
    });
  }
  filter(value):SubCategory[]{
    return this.subCategories.filter(item=> item.category == value);
    
  }
  search(){
      this.getFilterd(0);
  }

  deleteProduct(id){
    this.productService.deleteProduct(id).subscribe(product=>{console.log(product)
      if(product){this.getAll(0)}
    })
  }
}
