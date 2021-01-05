import { Feature } from './feature';
import { Image } from './image';
import { Review } from './review';

export class Product {
    id: string;
    designation: string;
    description: string;
    quantity: number;
    price: number;
    seller: any;
    subCategory: string;
    category:string;
    features: Feature[];
    images:Image[];
    reviews:Review[];
    review:number;
    priceHistory:PriceHistoryItem[];


  }
  export class PriceHistoryItem {
     price:number;
     updateDate:Date;
     public constructor(price,date) {
     this.price=price;
     this.updateDate=date;
  }
  }
export class ProductPage {
  content: Product[];
  empty :boolean
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number:number ;
  pageable:Object;
  sort:Object;


}