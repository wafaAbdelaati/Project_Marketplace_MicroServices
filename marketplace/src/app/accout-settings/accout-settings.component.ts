import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/customer';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../_services/customer/customer.service';
import { LoginService } from '../_services/login/login.service';
@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.scss']
})
export class AccoutSettingsComponent implements OnInit {
  customer :Customer = new Customer();
  settingFormGroup : FormGroup ;
  passwordUpdate:Boolean=false;
  constructor(private customerService : CustomerService,private loginService :LoginService) { }
  settingFormGroupBuild(){
    this.settingFormGroup = new FormGroup({
    firstname: new FormControl(this.customer.firstname),
    lastname: new FormControl(this.customer.lastname),
    phoneNumber: new FormControl(this.customer.phoneNumber),
    mail: new FormControl({value: this.customer.mail, disabled: true}),
    birthDate: new FormControl(this.customer.birthDate),
    gender: new FormControl(this.customer.gender),
    password: new FormControl('')
 
   });
  }
  ngOnInit() {
    this.settingFormGroupBuild();
    this.customerService.GetCustomer().subscribe(customer => {this.customer = customer;this.settingFormGroupBuild();});
   
  }
  update(){
    if(!this.passwordUpdate){this.settingFormGroup.value.password = this.customer.password}
    this.customer = Object.assign(this.customer,new Customer( this.settingFormGroup.value ) ) ;
    this.customerService.addCustomer(this.customer).subscribe(customer => this.loginService.login(customer,this.loginService.rememberMe()));
  }
}
