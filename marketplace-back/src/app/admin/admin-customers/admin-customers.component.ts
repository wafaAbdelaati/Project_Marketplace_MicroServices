import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer/customer.service';
import { Customer } from 'src/app/_models/customer';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss']
})
export class AdminCustomersComponent implements OnInit {
  @ViewChild('frame') public contentModal;
  customers:Customer[]=[];
  selectedcustomer:Customer=new Customer();
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers(){
    this.customerService.allCustomers().subscribe(customers=>{
      this.customers=customers
    });
  }
  show(customer){
    this.customerService.GetCustomerById(customer.id).subscribe(customer=>{
      this.selectedcustomer=customer;
    this.contentModal.show();
    });
    
  }
  change(active){
    this.customerService.updateCustomerAccount(this.selectedcustomer.id,active).subscribe(customer=>{
      this.getCustomers();
      this.show(this.selectedcustomer)
    });
  }
}
