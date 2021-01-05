import { Component, OnInit, ViewChild } from '@angular/core';
import { Order, State, OrderDetail } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order/order.service';
import { ProductService } from 'src/app/_services/product/product.service';
import { isString } from 'util';
import { CustomerService } from 'src/app/_services/customer/customer.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {
  @ViewChild('content') public contentModal;
  orders:Order[]=[];
  sellerOrders:Order[]=[];
  activeTab:number=0;
  details:boolean=false;
  Tabs =State.Tabs;
  state= State.values;
  selectedOrder:Order;
  constructor(private customerServcie:CustomerService, private orderService :OrderService,private productService:ProductService) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(){
    this.activeTab = 0;
    this.orderService.GetSellerOrders().subscribe(orders=>{
      orders.forEach(order=>{
        this.customerServcie.GetCustomerById(order.customer).subscribe(customer=>{
          order.customer=customer;
        })
      })
      this.sellerOrders=orders;this.orders=this.sellerOrders;
    });
  }
  onClosed(event: any) {
    this.selectedOrder=null;
  }
  show(orderId:string){
    this.orderService.GetOrderForSeller(orderId).subscribe(o =>{
      this.selectedOrder = o;
      this.selectedOrder.details.forEach(item => {
        if(isString(item.product)){
        this.productService.getProduct(item.product).subscribe(product =>{
           item.product = product
          });}
         
  
      });
      this.contentModal.show();
    });

}
  change(state){
    this.activeTab = state;
    if(this.Tabs[state]=== ""){
      this.orders =  this.sellerOrders;
    }
    else {
      this.orders =  this.sellerOrders.filter(x => x.state === this.Tabs[state]);
     
    }
  }
  changeValue(id, event){
    this.selectedOrder.details[id].approvedPrice=event.target.textContent;
    console.log(this.selectedOrder.details[id].approvedPrice)
  }
  Negotiate(order:Order){
    order.details.forEach(element => { element.product = element.product.id;
    });
    this.orderService.saveOrder(order).subscribe(order=> {this.getOrders();
      this.contentModal.hide();
    });
  }
  Accept(selectedOrder:Order,item:OrderDetail){
    item.state="validated";
    this.orderService.updateOrderDetailState(item.id,item.state).subscribe(orderDetail=>{
      this.getOrders();
    });
   
  }

}
