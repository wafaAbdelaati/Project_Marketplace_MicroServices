import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category/category.service';
import { Category } from 'src/app/_models/category';
import { Product, PriceHistoryItem } from 'src/app/_models/product';
import { Feature } from 'src/app/_models/feature';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ProductService } from 'src/app/_services/product/product.service';
import { Image } from 'src/app/_models/image';
import { LoginService } from 'src/app/_services/login/login.service';
import { Router } from '@angular/router';
import { Validator } from 'src/app/_Validator/validator';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
 
  step:number=1;
  categories:Category[]=[];
  selectedCategory:Category=new Category();
  newProduct:Product=new Product();
  selectedFiles: FileList;
  fileText="Selectionner un fichier"
  validator:Validator = new Validator();
  constructor(private categoryService:CategoryService,private productService:ProductService,private loginService:LoginService,private route:Router) {
 
   }

  ngOnInit() {
    this.newProduct.seller=this.loginService.getSeller().id;
    this.newProduct.category="0";this.newProduct.subCategory="0";
    this.newProduct.features=[new Feature()];
    this.newProduct.images=[];
    this.newProduct.priceHistory=[];
    this.getCategories();
  }
  changeStep(value){
    this.step=value;
  }
  addFeature(){
    this.newProduct.features[this.newProduct.features.length]=new Feature();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileText="";
    for (let index = 0; index <  this.selectedFiles.length; index++) {
      let file = this.selectedFiles.item(index);
      this.fileText+=file.name+" "
    }
    this.fileText+="("+this.selectedFiles.length+" images)"
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe(categories=>{
      this.categories=categories
    });
  }
  getSubCategories(value){
    this.categoryService.getCategory(value).subscribe(category=>{
      this.selectedCategory=category;
    })
  }
  setHistory(){
    var now = new Date().toJSON();
    let historyItem = new PriceHistoryItem(this.newProduct.price,now);
    this.newProduct.priceHistory.push(historyItem);
  }
  addProduct() {
    let end=false;
  this.setHistory()
   for (let index = 0; index <  this.selectedFiles.length; index++) {
     let file = this.selectedFiles.item(index);
     this.productService.pushFileToStorage(file).subscribe(event => {
       if (event instanceof HttpResponse) {
        let image = new Image();
        image.name=file.name;
        image.path=event.body as string
        this.newProduct.images.push(image)
      }
    });
    
   }
   setTimeout(() => {
    this.productService.addProduct(this.newProduct).subscribe(product=>{this.route.navigate(["seller/products"])
    });
   }, 5000);
    this.selectedFiles = undefined;
  } 
}
