import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../_services/category/category.service';
import { Category } from '../_models/category';
import { ProductService } from '../_services/product/product.service';
import { Product } from '../_models/product';
import { Env } from '../_services/env';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  categories:Category[]=[];
  products: Product[]=[];
  url:string=new Env().backUrl;
  constructor(private categoryService: CategoryService,private productService: ProductService ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }
  getCategories() {
    this.categoryService.getCategoriesInMenu()
    .subscribe(categories => {this.categories=categories.slice(0,3)}
      );
  }
  getProducts(): void {
    this.productService.getProductsInHome()
    .subscribe(products => {this.products = products.slice(0,3)});
  }
  

}
