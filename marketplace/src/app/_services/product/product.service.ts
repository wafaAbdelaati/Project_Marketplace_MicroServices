import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product,ProductPage } from '../../_models/product';
import { Env } from '../env';
import { Review } from 'src/app/_models/review';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  env : Env = new Env();
  Url = 'http://'+this.env.host+'/product-service/';
  constructor( private http: HttpClient) { }

  /** GET products from the server */
  getProductsInHome (): Observable<Product[]> {
    return this.http.get<Product[]>(this.Url+"allProductsInHome")
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }
  /** GET products from the server */
  searchProducts (keyword:string,page:number): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.Url+"filterByKeywordAll/"+keyword+"/"+page)
      .pipe(
        catchError(this.handleError<ProductPage>('getProducts', null))
      );
  }
  /** GET product by id from the server */
  updateProductQuantity (id:string,quantity): Observable<Product> {
    return this.http.get<Product>(this.Url+"updateProductQuantity",{
      params:{
        'id':id,
        'quantity':quantity,
        'add':'true'
      }
    })
      .pipe(
        catchError(this.handleError<Product>('updateProductQuantity', null))
      );
  }
   /** GET product by id from the server */
   getProduct (id:string): Observable<Product> {
    return this.http.get<Product>(this.Url+"getProduct/"+id)
      .pipe(
        catchError(this.handleError<Product>('getProduct', null))
      );
  }
  /** GET product by id from the server */
  getProductReviewAverage (id:string): Observable<number> {
    return this.http.get<number>(this.Url+"averageReviewsByProduct/"+id)
      .pipe(
        catchError(this.handleError<number>('averageReviewsByProduct', null))
      );
  }
   /** POST: add a new review to the database */
addReview (review: Review): Observable<Review> {
  return this.http.post<Review>(this.Url+'saveReview', review)
    .pipe(
      catchError(this.handleError<Review>('saveReview', review))
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
