import { Component, OnInit } from '@angular/core';
import { Customer } from '../_models/customer';
import { LoginService } from '../_services/login/login.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  customer :Customer;
  constructor(private loginService :LoginService) { }

  ngOnInit() {
    this.customer = this.loginService.getCustomer(); 
  }

}
