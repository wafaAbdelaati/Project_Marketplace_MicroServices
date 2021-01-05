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
  
   /** GET: Find a  Seller */
 getSeller(id: string): Observable<Seller> {
  return this.http.get<Seller>(this.Url+'getSeller/'+id )
    .pipe(
      catchError(this.handleError<Seller>('getSeller', null))
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
