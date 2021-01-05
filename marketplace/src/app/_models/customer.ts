import { Order } from './order';
import { Review } from './review';

export class Customer {
    id: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    birthDate: string;
    mail: string;
    password: string;
    gender: string;
    address: string;
    deliveryAddress: string;
    isActive:Boolean;
    orders:Order[];
    reviews:Review[];
    public constructor(init?: Partial<Customer >) {
        Object.assign(this, init);
    }

  }