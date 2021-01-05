import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Category } from '../_models/category';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../_services/category/category.service';
import { LoginService } from '../_services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  keyword = new FormControl('');
  title="Mon Compte"
  searchDropdown = false;
  categories: Category[];
  otherCategories : Category[];
  categoriesSearch: Category[];
  isLoggedIn : any ;
  constructor(private categoryService: CategoryService,public router: Router,private loginService :LoginService) {   }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.searchDropdown=false;
     this.getCategoriesInMenu();
    this.getCategoriesNotInMenu();
    this.getTitle();
  }
  logout(){
     this.loginService.logout();
   
    
  }
  getTitle(){
    if(this.isLoggedIn){
      this.title="Bonjour "+ this.loginService.getCustomer().firstname;
    }
    else {
      this.title="Mon Compte"
    }
  }
  getCategoriesInMenu(): void {
    this.categoryService.getCategoriesInMenu()
    .subscribe(categories => this.categories = categories 
      );
  }
  getCategoriesNotInMenu(): void {
    this.categoryService.getCategoriesNotInMenu()
    .subscribe(otherCategories => this.otherCategories = otherCategories 
      );
  }

  search(){
    this.searchDropdown=false
    let keyword = this.keyword.value;
    this.keyword = new FormControl('');
  this.router.navigate(['/search/'+keyword]);
 
  }
  goTo(id){
    this.searchDropdown=false
    let keyword = this.keyword.value;
    this.keyword = new FormControl('');
    this.router.navigate(['/search/'+keyword], { queryParams: { category: id } });
  }
  keyup(keyword){
    this.categoryService.getCategoriesByKeyword(keyword).subscribe(categories => { 
      this.categoriesSearch = categories; 
      (this.categoriesSearch.length==0)?this.searchDropdown=false:this.searchDropdown=true;
   
      
     });
  }
 
  
}
