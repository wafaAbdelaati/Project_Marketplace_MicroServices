import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../_models/customer';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import SimpleCrypto from "simple-crypto-js";
import { Admin } from 'src/app/_models/admin';
import { Router } from '@angular/router';
import { Seller } from 'src/app/_models/seller';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _secretKey = "Five12345";
  simpleCrypto = new SimpleCrypto(this._secretKey);
  constructor(private cookieService: CookieService,private location: Location,private router : Router ) { }

  encrypt(object){

    return  this.simpleCrypto.encrypt(object);
  }
  decrypt(object):any{
    return this.simpleCrypto.decrypt(object).toString(); 
  }
  login(admin:Admin,rememberMe:Boolean,login:Boolean){
    localStorage.setItem('rememberMe',JSON.stringify(rememberMe));
    if(rememberMe){
 
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('admin',this.encrypt(admin));
    localStorage.setItem('key1',this.encrypt(admin.mail))
    localStorage.setItem('key2',this.encrypt(admin.password))
    }
    else {
      sessionStorage.setItem('isLoggedIn','true');
      sessionStorage.setItem('admin',this.encrypt(admin));
      localStorage.removeItem('key1');
      localStorage.removeItem('key2');
        }
        (login)?this.router.navigate(["admin/home"]):location.reload();
        
      
  }
  loginSeller(seller:Seller,rememberMe:Boolean,login:Boolean){
    localStorage.setItem('rememberMe',JSON.stringify(rememberMe));
    if(rememberMe){
 
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('seller',this.encrypt(seller));
    localStorage.setItem('key1',this.encrypt(seller.mail))
    localStorage.setItem('key2',this.encrypt(seller.password))
    }
    else {
      sessionStorage.setItem('isLoggedIn','true');
      sessionStorage.setItem('seller',this.encrypt(seller));
      localStorage.removeItem('key1');
      localStorage.removeItem('key2');
        }
        (login)?this.router.navigate(["seller/home"]):location.reload();
        
      
  }
  rememberMe():boolean{
    let rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
    if(rememberMe === null){
      rememberMe = false;
    }
   
    return rememberMe;
  }
  getlogin(){
    let admin = new Admin();
    if(this.rememberMe()){
    admin.mail = this.decrypt(localStorage.getItem('key1'));
    admin.password = this.decrypt(localStorage.getItem('key2'));
    }else {
      admin.mail = "";admin.password = "";
    }

    return admin;
  }
  getloginSeller(){
    let seller = new Seller();
    if(this.rememberMe()){
      seller.mail = this.decrypt(localStorage.getItem('key1'));
      seller.password = this.decrypt(localStorage.getItem('key2'));
    }else {
      seller.mail = "";seller.password = "";
    }

    return seller;
  }
  getAdmin():Admin{
    let admin:string;
    if(this.rememberMe()){
      admin =localStorage.getItem('admin');
    }
    else {
      admin =sessionStorage.getItem('admin')     
    }

    return new Admin(JSON.parse(this.decrypt(admin)));
  }
  getSeller():Seller{
    let seller:string;
    if(this.rememberMe()){
      seller =localStorage.getItem('seller');
    }
    else {
      seller =sessionStorage.getItem('seller')     
    }
    if(seller){ return new Seller(JSON.parse(this.decrypt(seller)));}
      else{return null;}
    
  }
  
  isLoggedIn():Boolean{
    if(this.rememberMe()){
      return Boolean(JSON.parse(localStorage.getItem('isLoggedIn'))); 
      }
      else {
        return Boolean(JSON.parse(sessionStorage.getItem('isLoggedIn'))); 
      }
     
     
  }

  logout() {
    if(this.rememberMe()){
      localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('admin');
      }
      else {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('admin');
      }
    
      this.router.navigate(["admin"]);
  }
  logoutSeller() {
    if(this.rememberMe()){
      localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('seller');
      }
      else {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('seller');
      }
    
      this.router.navigate(["seller"]);
  }
}
