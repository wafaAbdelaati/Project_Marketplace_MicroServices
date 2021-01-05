import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Env } from '../env';
import { Order, OrderDetail } from 'src/app/_models/order';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/order-service/';
  constructor(private http: HttpClient,private loginService:LoginService) { }

 /** POST: add a new order  */
saveOrder (order: Order): Observable<Order> {
  return this.http.post<Order>(this.Url+'saveOrder', order)
    .pipe(
      catchError(this.handleError<Order>('saveOrder', order))
    );
}
/** GET:    Seller's orders */
GetSellerOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(this.Url+'OrdersBySeller/'+this.loginService.getSeller().id)
    .pipe(
      catchError(this.handleError<Order[]>('GetSellerOrders', null))
    );
}
/** GET:  an  Order */
GetOrder(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'getOrder/'+id)
    .pipe(
      catchError(this.handleError<Order>('getOrder', null))
    );
}
/** GET:  an  Order */
GetOrderForSeller(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'OrderBySeller',{
    params:{
      'id':id,
      'seller':this.loginService.getSeller().id
    }
  })
    .pipe(
      catchError(this.handleError<Order>('OrderBySeller', null))
    );
}
/** GET:  delete an  Order */
deleteOrder(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'deleteOrder/'+id)
    .pipe(
      catchError(this.handleError<Order>('deleteOrder', null))
    );
}
/** GET:  delete an  Order'detail */
deleteOrderDetail(id:string): Observable<Order> {
  return this.http.get<Order>(this.Url+'deleteOrderDetail/'+id)
    .pipe(
      catchError(this.handleError<Order>('deleteOrderDetail', null))
    );
}
/** GET: update   Order's state */
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
/** GET:  update   OrderDetail's state */
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
        /* Statistics */ 
    /** GET: Dashborad ProductsCount */
    DashboradOrdersCount(): Observable<number> {
      return this.http.get<number>(this.Url+'DashboradOrdersCount' )
        .pipe(
          catchError(this.handleError<number>('DashboradOrdersCount', null))
        );
    }
     /* Statistics */ 
    /** GET: Dashborad : Seller's Orders By State */
    DashboradSellerOrdersByState(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradSellerOrdersByState',{
        params:{
          'id':this.loginService.getSeller().id
        }
      } )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradSellerOrdersByState', null))
        );
    }
         /* Statistics */ 
    /** GET: Dashborad : SellerOrdersByAmount */
    DashboradSellerOrdersByAmount(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradSellerOrdersByAmount',{
        params:{
          'id':this.loginService.getSeller().id
        }
      } )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradSellerOrdersByAmount', null))
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
