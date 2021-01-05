import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { SubCategory } from 'src/app/_models/subCategory';
import { CategoryService } from 'src/app/_services/category/category.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Validator } from 'src/app/_Validator/validator';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.scss']
})
export class AdminAddCategoryComponent implements OnInit {
  newCategory:Category= new Category();
  valid:Boolean=false;
  validator:Validator = new Validator();
  constructor(private categoryService : CategoryService,private router:Router) { }

  ngOnInit() {
    this.newCategory.subCategories = [new SubCategory()];
  }
  addSubCategory(){
    this.newCategory.subCategories[this.newCategory.subCategories.length]=new SubCategory();
    this.valid=false;
  }
  check(value){
    let length = this.newCategory.subCategories.filter(x=> x.name==="" || this.validator.AlphabetOnly(value.value)).length;
    (length==0)?this.valid=false:this.valid=true;;
    
    
  }
  validate(value:NgModel){
  let check = this.validator.AlphabetOnly(value.value);
  (check)?value.control.setErrors(value.control.errors):value.control.setErrors({"pattern":!check})
  
    

  }
 
  addNewCategory(){
    
     this.categoryService.addCategory(this.newCategory).subscribe(category=>{
      this.router.navigate(['admin/categories']);
    }); 
    
  }
  cancel(){
    this.router.navigate(['admin/categories']);
  }
}
