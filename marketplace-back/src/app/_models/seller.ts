import { Product } from './product';
import { Order } from './order';

export class Seller {
    id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    birthDate: string;
    mail: string;
    password: string;
    companyName: string;
    address: string;
    isActive:Boolean;
    products:Product[];
    orders:Order[];
    public constructor(init?: Partial<Seller >) {
      Object.assign(this, init);
  }

  }