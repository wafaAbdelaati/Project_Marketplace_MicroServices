import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/_services/category/category.service';
import { Category } from 'src/app/_models/category';
import { SubCategory } from 'src/app/_models/subCategory';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('content') public contentModal;
  updateSuccess:boolean=false;
  categories:Category[]=[];
  selectedCategory:Category=new Category();
  addSubCategory:Boolean=false;
  newSubCategory:SubCategory= new SubCategory();
  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }
  onClosed(event: any) {
    this.selectedCategory = new Category();
  }
   getCategories(){
     this.categoryService.getAllCategories().subscribe(categories => {
       console.log(categories);
       this.categories=categories;
     });
   }
   AddToMenu(id,inhome){
     console.log(id);
     this.categoryService.addCategoryToMenu(id,inhome).subscribe(cat=>{
       this.getCategories();
     });

   }
   show(categoryId:string){
      this.categoryService.getCategory(categoryId).subscribe(category=>{
        this.selectedCategory=category;
        this.contentModal.show();
      });
}
changeValue(id, event){
  this.selectedCategory.subCategories[id].name=event.target.textContent;
  console.log(event.target.textContent)
}
changeCategoryValue(id, event){
  this.categories[id].name=event.target.textContent;
 this.categoryService.saveCategory(this.categories[id]).subscribe(category=>{
  this.updateSuccess=true;
  this.selectedCategory=category;
      setTimeout(() => {
        this.updateSuccess=false;
        this.selectedCategory= new Category();
      }, 10000);
    });
  
}
updateSubCategory(subCategory){
  console.log(this.selectedCategory);
  console.log(subCategory);
  this.categoryService.addSubCategory(subCategory).subscribe(subCategory =>{
    console.log(subCategory);this.show(subCategory.category);
  });
}
addNewSubCategory(){
   this.newSubCategory.category=this.selectedCategory.id;
   this.categoryService.addSubCategory(this.newSubCategory).subscribe(subCategory =>{
    this.newSubCategory= new SubCategory();this.addSubCategory=false;this.show(subCategory.category);
    
  });
}
deleteCategory(id){
  this.categoryService.deleteCategory(id).subscribe(category=> {
    this.getCategories();
  });
}
deleteSubCategory(id){
  this.categoryService.deleteSubCategory(id).subscribe(subcategory=> {
    this.show(this.selectedCategory.id);
  });
}
}
