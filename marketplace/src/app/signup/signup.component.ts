import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../_services/customer/customer.service';
import { LoginService } from '../_services/login/login.service';
import { CustomValidators } from '../_Validators/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  customer :Customer;
  error :boolean = false;
  signinFormGroup : FormGroup;
  signupFormGroup : FormGroup;
  rememberMe :FormControl;
  constructor(private customerService : CustomerService,public router: Router,private loginService :LoginService) { }

  ngOnInit() {

  this.signinFormGroupBuild();
  this.signupFormGroupBuild();

  }
  signinFormGroupBuild(){
    let customer = this.loginService.getlogin();
     this.signinFormGroup = new FormGroup({
      mail: new FormControl(customer.mail),
      password: new FormControl(customer.password),
    });
   
    this.rememberMe = new FormControl(this.loginService.rememberMe());
  
  }
  signupFormGroupBuild(){
    this.signupFormGroup = new FormGroup({
    firstname: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    lastname: new FormControl('',{
      validators:  [Validators.required,Validators.maxLength(10)],
     updateOn: 'blur'
    }),
    phoneNumber: new FormControl('', {
      validators:  [Validators.required,Validators.maxLength(8),CustomValidators.patternValidator(/\d/, {hasNumber: true})]
    }),
    mail: new FormControl('', {
      validators:  [Validators.required,Validators.email],
     updateOn: 'blur'
    }),
    password: new FormControl('',{
      validators:  [ Validators.required, CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true}), Validators.minLength(8)],
     updateOn: 'blur'
    }),
    address: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    isActive:new FormControl(true)
   });
 }
  signin(){
    this.customer =  new Customer( this.signinFormGroup.value ) ;
    this.customerService.FindCustomer(this.customer).subscribe(customer =>{ this.customer = customer;
    if (this.customer != null){
      this.error = false;
      this.loginService.login(this.customer,this.rememberMe.value);

    }
    else {
      this.error = true;
    }
    })
  }
  signup(){
     this.customer =  new Customer( this.signupFormGroup.value ) ;
    this.customerService.addCustomer(this.customer).subscribe(customer =>
      {  this.loginService.login(customer,false ) }
        ); 
    
  }
}
