import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Env } from '../env';
import { Order, OrderDetail } from 'src/app/_models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/order-service/';
  constructor(private http: HttpClient) { }

 /** POST: add a new order to the database */
saveOrder (order: Order): Observable<Order> {
  return this.http.post<Order>(this.Url+'saveOrder', order)
    .pipe(
      catchError(this.handleError<Order>('saveOrder', order))
    );
}
 /** POST: add a new order to the database */
 updateOrder (orderDetail: OrderDetail): Observable<Boolean> {
  return this.http.post<Boolean>(this.Url+'updateOrder', orderDetail)
    .pipe(
      catchError(this.handleError<Boolean>('saveOrder', true))
    );
}
/** GET:  an  Order */
updateOrderState(id:string,state): Observable<Order> {
  return this.http.get<Order>(this.Url+'updateOrderState',{
    params:{
      'id':id,
      'state':state
    }
  })
    .pipe(
      catchError(this.handleError<Order>('updateOrderState', null))
    );
}

/** GET:  an  Order */
updateOrderDetailState(id:string,state): Observable<OrderDetail> {
  return this.http.get<OrderDetail>(this.Url+'updateOrderDetailState',{
    params:{
      'id':id,
      'state':state
    }
  })
    .pipe(
      catchError(this.handleError<OrderDetail>('updateOrderDetailState', null))
    );
}
/** GET:  an  Order */
GetOrder(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'getOrder/'+id)
    .pipe(
      catchError(this.handleError<Order>('getOrder', null))
    );
}
/** GET:  delete an  Order */
deleteOrder(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'deleteOrder/'+id)
    .pipe(
      catchError(this.handleError<Order>('deleteOrder', null))
    );
}
/** GET:  delete an  Order */
deleteOrderDetail(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'deleteOrderDetail/'+id)
    .pipe(
      catchError(this.handleError<Order>('deleteOrderDetail', null))
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
