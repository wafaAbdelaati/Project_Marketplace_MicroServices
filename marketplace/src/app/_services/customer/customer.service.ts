import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../../_models/customer';

import { Env } from '../env';
import { LoginService } from '../login/login.service';
import { custom } from '@rxweb/reactive-form-validators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/user-service/';
  constructor(private http: HttpClient,private loginService:LoginService) { }

  /** POST: add a new Customer to the database */
addCustomer (customer: Customer): Observable<Customer> {
  return this.http.post<Customer>(this.Url+'saveCustomer', customer)
    .pipe(
      catchError(this.handleError<Customer>('addCustomer', customer))
    );
}
/** GET: Find a  Customer */
GetCustomer (): Observable<Customer> {
  let customer = this.loginService.getCustomer();
  return this.http.get<Customer>(this.Url+'getCustomer/'+customer.id)
    .pipe(
      catchError(this.handleError<Customer>('findCustomerForLogin', customer))
    );
}
/** GET: Find a  Customer */
GetCustomerById (id): Observable<Customer> {
  return this.http.get<Customer>(this.Url+'getCustomer/'+id)
    .pipe(
      catchError(this.handleError<Customer>('findCustomerForLogin', null))
    );
}
 /** GET: Find a  Customer */
 FindCustomer (customer: Customer): Observable<Customer> {
  return this.http.get<Customer>(this.Url+'findCustomerForLogin', {
    params:{
      "mail":customer.mail,
      "password":customer.password
    }
  })
    .pipe(
      catchError(this.handleError<Customer>('findCustomerForLogin', customer))
    );
}
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
