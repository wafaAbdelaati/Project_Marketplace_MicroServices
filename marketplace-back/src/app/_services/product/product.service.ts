import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product,ProductPage } from '../../_models/product';
import { Env } from '../env';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  env : Env = new Env();
  Url = 'http://'+this.env.host+'/product-service/';
  constructor( private http: HttpClient,private  loginService:LoginService) { }
  /** GET seller products -By Page  */
  getSellerProductsByPage (page): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.Url+"BySeller",{
      params:{
        "id":this.loginService.getSeller().id,
        "page":page
      }
    })
      .pipe(
        catchError(this.handleError<ProductPage>('getProductsByPage', null))
      );
  }
  /** GET seller products  */
  getSellerProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.Url+"BySeller/"+this.loginService.getSeller().id)
      .pipe(
        catchError(this.handleError<Product[]>('getProductsByPage', null))
      );
  }
  /** GET products - by page*/
  getProductsByPage (page): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.Url+"allProductsByPage",{
      params:{
        "page":page
      }
    })
      .pipe(
        catchError(this.handleError<ProductPage>('getProductsByPage', null))
      );
  }
    /** GET search for products in seller's products */
    searchProductsByPage (keyword,page,category,subCategory): Observable<ProductPage> {
      return this.http.get<ProductPage>(this.Url+"search",{
        params:{
          "seller":this.loginService.getSeller().id,
          "keyword":keyword,
          "page":page,
          "category":category,
          "subCategory":subCategory
        }
      })
        .pipe(
          catchError(this.handleError<ProductPage>('getProductsByPage', null))
        );
    }
  /** GET add product to home  */
  addProductToHome (id,inhome): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.Url+"addProductToHome",{
      params:{
        "id":id,
        "home":inhome
      }
    })
      .pipe(
        catchError(this.handleError<ProductPage>('addProductToHome', null))
      );
  }
  /** GET products from the server */
  getProductsInHome (): Observable<Product[]> {
    return this.http.get<Product[]>(this.Url+"allProductsInHome")
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }
  /** GET searchProducts */
  searchProducts (keyword:string,page:number): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.Url+"filterByKeywordAll/"+keyword+"/"+page)
      .pipe(
        catchError(this.handleError<ProductPage>('getProducts', null))
      );
  }

   /** GET product by id  */
   getProduct (id:string): Observable<Product> {
    return this.http.get<Product>(this.Url+"getProduct/"+id)
      .pipe(
        catchError(this.handleError<Product>('getProduct', null))
      );
  }
     /** DELETE: delete product  */
deleteProduct (id): Observable<Product> {
  return this.http.get<Product>(this.Url+'deleteProduct',{
    params:{
      "id":id
    }
  })
    .pipe(
      catchError(this.handleError<Product>('deleteProduct', id))
    );
}
  /** GET averageReviewsByProduct */
  getProductReviewAverage (id:string): Observable<number> {
    return this.http.get<number>(this.Url+"averageReviewsByProduct/"+id)
      .pipe(
        catchError(this.handleError<number>('averageReviewsByProduct', null))
      );
  }
     /** POST: add a new Product to the database */
     addProduct (product: Product): Observable<Product> {
      return this.http.post<Product>(this.Url+'addProduct', product)
        .pipe(
          catchError(this.handleError<Product>('addProduct', product))
        );
    }
        /** POST: update Product to the database */
        saveProduct (product: Product): Observable<Product> {
          return this.http.post<Product>(this.Url+'saveProduct', product)
            .pipe(
              catchError(this.handleError<Product>('saveProduct', product))
            );
        }
        /* Statistics */ 
    /** GET: Dashborad ProductsCount */
    DashboradProductsCount(): Observable<number> {
      return this.http.get<number>(this.Url+'DashboradProductsCount' )
        .pipe(
          catchError(this.handleError<number>('DashboradProductsCount', null))
        );
    }
     /* Statistics */ 
    /** GET: Dashborad : SellerProductsByReviews */
    DashboradSellerProductsByReviews(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradSellerProductsByReviews',{
        params:{
          'id':this.loginService.getSeller().id
        }
      } )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradSellerProductsByReviews', null))
        );
    }
      /* Statistics */ 
    /** GET: Dashborad : SellerProductsByReviewsAverage */
    DashboradSellerProductsByReviewsAverage(): Observable<Object[]> {
      return this.http.get<Object[]>(this.Url+'DashboradSellerProductsByReviewsAverage',{
        params:{
          'id':this.loginService.getSeller().id
        }
      } )
        .pipe(
          catchError(this.handleError<Object[]>('DashboradSellerProductsByReviewsAverage', null))
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
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', this.Url+'storage/uploadFile', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 

}
