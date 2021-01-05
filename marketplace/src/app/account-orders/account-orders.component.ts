import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../_models/customer';
import { LoginService } from '../_services/login/login.service';
import { CustomerService } from '../_services/customer/customer.service';
import { State, OrderDetail, Order } from '../_models/order';
import { ProductService } from '../_services/product/product.service';
import { SellerService } from '../_services/seller/seller.service';
import { isString } from 'util';
import { OrderService } from '../_services/order/order.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {
  @ViewChild('content') public contentModal;
  customer :Customer = new Customer();
  orders:Order[];
  activeTab:number=0;
  details:boolean=false;
  Tabs =State.Tabs;
  state= State.values;
  selectedOrder:Order;
  constructor(private customerService : CustomerService,private orderService :OrderService,private productService:ProductService,private sellerService : SellerService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(){
    this.activeTab = 0;
    this.customerService.GetCustomer().subscribe(customer => {this.customer = customer;this.orders=this.customer.orders;
    });
  }
  onClosed(event: any) {
    this.selectedOrder=null;
  }
  show(orderId:string){
    this.orderService.GetOrder(orderId).subscribe(o =>{
      this.selectedOrder = o;
      this.selectedOrder.details.forEach(item => {
        if(isString(item.product)){
        this.productService.getProduct(item.product).subscribe(product =>{
           item.product = product
          });}
          if(isString(item.seller)){
         this.sellerService.getSeller(item.seller).subscribe(seller => {
           item.seller = seller;
  
         });}
  
      });
      this.contentModal.show();
    });

}
  change(state){
    console.log(state)
    this.activeTab = state;
    if(this.Tabs[state]=== ""){
      this.orders =  this.customer.orders;
    }
    else {
      this.orders =  this.customer.orders.filter(x => x.state === this.Tabs[state]);
     
    }
  }
  changeValue(id, event){
    this.selectedOrder.details[id].suggestedPrice=event.target.textContent;
    console.log(event.target.textContent)
  }
  Negotiate(order:Order){
    order.details.forEach(element => { element.product = element.product.id;element.seller = element.seller.id 
    });
    this.orderService.saveOrder(order).subscribe(order=> {console.log(order);
      this.contentModal.hide();
    });
    
  }
  Accept(selectedOrder:Order,item:OrderDetail){
    item.state="progress";
    item.suggestedPrice=item.approvedPrice;
    item.seller=item.seller.id;
    item.product=item.product.id;
    this.orderService.updateOrder(item).subscribe(res=>{console.log(res);
      this.orderService.updateOrderDetailState(item.id,item.state).subscribe(orderDetail=>{
        console.log(orderDetail);
        this.getOrders();
        this.show(item.order);
      });
    })
    
  }
  delete(selectedOrder:Order,item:OrderDetail){
    let index = selectedOrder.details.findIndex(x=> (x.state=== "init") && (x.id!=item.id ));
    if(index === -1){
      selectedOrder.state="progress";
    } 
    console.log(selectedOrder);
      this.orderService.deleteOrderDetail(item.id).subscribe(order=> {
        this.orderService.updateOrderState(selectedOrder.id,selectedOrder.state).subscribe(order=>{
          this.getOrders();
          this.show(item.order);
        })  ;   
    });  
    
  }
  deleteOrder(item:Order){
    this.orderService.deleteOrder(item.id).subscribe(order=> {
      this.getOrders();
      
    });
  }
}
