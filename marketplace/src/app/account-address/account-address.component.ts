import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/customer';
import { CustomerService } from '../_services/customer/customer.service';
import { LoginService } from '../_services/login/login.service';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss']
})
export class AccountAddressComponent implements OnInit {
  customer :Customer;
  address:string;
  deliveryAddress:string;
  constructor(private customerService : CustomerService,private loginService :LoginService) { }

  ngOnInit() {
    this.customer = this.loginService.getCustomer();
    this.address = this.customer.address;
    this.deliveryAddress = this.customer.deliveryAddress;
  }
  update(address){
    if (address==1){
      this.customer.address = this.address;
    }
    else{
      this.customer.deliveryAddress = this.deliveryAddress;
    }
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(customer => 
      {  this.loginService.login(customer,this.loginService.rememberMe());
      });
  }
}
