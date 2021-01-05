import { Product } from './product';

export class Order {
    id: string;
    orderDate: Date;
    customer: any;
    state: string;
    details:OrderDetail[];
    amount:number;
    public constructor(customer,orderDate,state) {
      this.customer = customer;
       this.orderDate=orderDate;
       this.state=state;
   }

  }

  export class OrderDetail {
    id: string;
    order:string;
    product: any;
    seller :any;
    quantity:number;
    suggestedPrice: number;
    approvedPrice: number;
    state: string;
    
    public constructor(seller,product,quantity) {
       this.seller = seller;
        this.quantity=quantity;
        this.product=product;
    }


  } 

export class Cart {
    details:OrderDetail[];
    amount:number;
    public constructor(init?: Partial<Cart >) {
        this.details=[];
        Object.assign(this, init);
    }
    
    
}
export class State {
  static values= 
    { ["init"]: "En cours de negociation",["progress"]: "En cours" ,["validated"]: "Validée",["ended"]: "Archivee"}
  ;
  static Tabs =["","init","progress","validated","ended"];
 
  }
