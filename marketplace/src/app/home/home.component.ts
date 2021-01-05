import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }
 
  getProducts(): void {
    this.productService.getProductsInHome()
    .subscribe(products => {this.products = products});
  }
}
