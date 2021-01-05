import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Env } from '../env';
import { Seller } from 'src/app/_models/seller';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/user-service/';
  constructor(private http: HttpClient) { }
   /** POST: add a new Seller  */
addSeller (seller: Seller): Observable<Seller> {
  return this.http.post<Seller>(this.Url+'saveSeller', seller)
    .pipe(
      catchError(this.handleError<Seller>('addSeller', seller))
    );
}
   /** GET: Find a  Seller */
 getSeller(id: string): Observable<Seller> {
  return this.http.get<Seller>(this.Url+'getSeller/'+id )
    .pipe(
      catchError(this.handleError<Seller>('getSeller', null))
    );
}
   /** GET: Find a  Seller for login */
   findSeller(seller: Seller): Observable<Seller> {
    return this.http.get<Seller>(this.Url+'findSeller',{
      params:{
        'mail':seller.mail,
        'password':seller.password
      }
    } )
      .pipe(
        catchError(this.handleError<Seller>('getSeller', null))
      );
  }
 /** GET: Find all  Seller */
 allSellers(): Observable<Seller[]> {
  return this.http.get<Seller[]>(this.Url+'allSellers' )
    .pipe(
      catchError(this.handleError<Seller[]>('getSeller', []))
    );
}
  /** GET: update  a  Seller's account */
  updateSellerAccount(id: string,state): Observable<Seller> {
    return this.http.get<Seller>(this.Url+'updateSeller',{
      params:{
        "id":id,
        "state":state
      }
    } )
      .pipe(
        catchError(this.handleError<Seller>('updateSeller', null))
      );
  }
  /* Statistics */ 
    /** GET: Dashborad : SellersCount */
    DashboradSellersCount(): Observable<number> {
      return this.http.get<number>(this.Url+'DashboradSellersCount' )
        .pipe(
          catchError(this.handleError<number>('DashboradSellersCount', null))
        );
    }
     /* Statistics */ 
    /** GET: Dashborad : ProductsBySellerst */
    DashboradProductsBySellers(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradProductsBySellers' )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradProductsBySellers', null))
        );
    }
      /* Statistics */ 
    /** GET: Dashborad : OrdersBySellers*/
    DashboradOrdersBySellers(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradOrdersBySellers' )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradOrdersBySellers', null))
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
