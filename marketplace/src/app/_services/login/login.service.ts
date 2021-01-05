import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../_models/customer';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import SimpleCrypto from "simple-crypto-js";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _secretKey = "Five12345";
  simpleCrypto = new SimpleCrypto(this._secretKey);
  constructor(private cookieService: CookieService,private location: Location ) { }

  encrypt(object){

    return  this.simpleCrypto.encrypt(object);
  }
  decrypt(object):any{
    return this.simpleCrypto.decrypt(object).toString(); 
  }
  login(customer:Customer,rememberMe:Boolean){
    localStorage.setItem('rememberMe',JSON.stringify(rememberMe));
    if(rememberMe){
 
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('customer',this.encrypt(customer));
    localStorage.setItem('key1',this.encrypt(customer.mail))
    localStorage.setItem('key2',this.encrypt(customer.password))
    }
    else {
      sessionStorage.setItem('isLoggedIn','true');
      sessionStorage.setItem('customer',this.encrypt(customer));
      localStorage.removeItem('key1');
      localStorage.removeItem('key2');
        }
        
        this.location.back();this.location.subscribe(x=> location.reload())
      
  }
  rememberMe():boolean{
    let rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
    if(rememberMe === null){
      rememberMe = false;
    }
   
    return rememberMe;
  }
  getlogin(){
    let customer = new Customer();
    if(this.rememberMe()){
    customer.mail = this.decrypt(localStorage.getItem('key1'));
    customer.password = this.decrypt(localStorage.getItem('key2'));
    }else {
      customer.mail = "";customer.password = "";
    }

    return customer;
  }
  getCustomer():Customer{
    let customer:string;
    if(this.rememberMe()){
      customer =localStorage.getItem('customer');
    }
    else {
      customer =sessionStorage.getItem('customer')     
    }

    return new Customer(new Customer(JSON.parse(this.decrypt(customer))));
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
    localStorage.removeItem('customer');
      }
      else {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('customer');
      }
    
    location.reload();
  }
}
