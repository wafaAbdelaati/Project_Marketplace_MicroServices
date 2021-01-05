import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../../_models/category';
import { SubCategory } from '../../_models/subCategory';
import { Env } from '../env';


@Injectable({ providedIn: 'root' })
export class CategoryService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/category-service/';
  constructor( private http: HttpClient) {

   }

    /** GET categories from the server */
    getCategoriesInMenu (): Observable<Category[]> {
      return this.http.get<Category[]>(this.Url+"allCategoriesInMenu")
        .pipe(
          catchError(this.handleError<Category[]>('getCategories', []))
        );
    }
    /** GET categories from the server by KeyWord */
    getCategoriesByKeyword(keyword:string): Observable<Category[]> {
      return this.http.get<Category[]>(this.Url+"filterByKeyword/"+keyword)
        .pipe(
          catchError(this.handleError<Category[]>('getCategories', []))
        );
    }
     /** GET categories from the server */
     getCategoriesNotInMenu (): Observable<Category[]> {
      return this.http.get<Category[]>(this.Url+"allCategoriesNotInMenu")
        .pipe(
          catchError(this.handleError<Category[]>('getCategories', []))
        );
    }
    /** GET category from the server */
    getCategory (id:string): Observable<Category> {
      return this.http.get<Category>(this.Url+"getCategory/"+id)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET category from the server */
    getCategoryByPage (id:string,page:number,sort:string,dir:string): Observable<Category> {
      return this.http.get<Category>(this.Url+"getCategory/"+id+"/"+page+"/"+sort+"/"+dir)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET category from the server by key word */
    getCategoryByPageAndKeyword (keyword:string,id:string,page:number): Observable<Category> {
      return this.http.get<Category>(this.Url+"filterByKeywordAndCategory/"+keyword+"/"+id+"/"+page)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET subcategory from the server */
    getSubCategory (id:string): Observable<SubCategory> {
      return this.http.get<SubCategory>(this.Url+"getSubCategory/"+id)
        .pipe(
          catchError(this.handleError<SubCategory>('getSubCategory',null))
        );
    }
    /** GET subcategory from the server */
    getSubCategoryByPage (id:string,page:number,sort:string,dir:string): Observable<SubCategory> {
      return this.http.get<SubCategory>(this.Url+"getSubCategory/"+id+"/"+page+"/"+sort+"/"+dir)
        .pipe(
          catchError(this.handleError<SubCategory>('getSubCategory',null))
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
