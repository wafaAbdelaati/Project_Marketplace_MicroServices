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
     
     /** POST: add a new category  */
addCategory (category: Category): Observable<Category> {
  return this.http.post<Category>(this.Url+'addCategory', category)
    .pipe(
      catchError(this.handleError<Category>('addCategory', category))
    );
}
   
     /** POST: Update a category  */
saveCategory (category: Category): Observable<Category> {
  return this.http.post<Category>(this.Url+'saveCategory', category)
    .pipe(
      catchError(this.handleError<Category>('saveCategory', category))
    );
}
     /** POST: Update or Add a subCategory */
     addSubCategory (subCategory: SubCategory): Observable<SubCategory> {
      return this.http.post<SubCategory>(this.Url+'saveSubCategory', subCategory)
        .pipe(
          catchError(this.handleError<SubCategory>('SubCategory', subCategory))
        );
    }
    /** GET : All Categories */
    getAllCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(this.Url+"allCategories")
        .pipe(
          catchError(this.handleError<Category[]>('getCategories', []))
        );
    }
      /** GET categories by ids */
      getCategoriesByIds(list): Observable<Category[]> {
        return this.http.get<Category[]>(this.Url+"CategoriesByIds",{
          params:{
            'ids':list
          }
        })
          .pipe(
            catchError(this.handleError<Category[]>('CategoriesByIds', []))
          );
      }
       /** GET sub categories by ids  */
       getSubCategoriesByIds(list): Observable<SubCategory[]> {
        return this.http.get<SubCategory[]>(this.Url+"SubCategoriesByIds",{
          params:{
            'ids':list
          }
        })
          .pipe(
            catchError(this.handleError<SubCategory[]>('SubCategoriesByIds', []))
          );
      }
     /** GET: Add category To Menu  */
     addCategoryToMenu (id:string,inhome): Observable<Category> {
      return this.http.get<Category>(this.Url+"addCategoryToMenu",{
        params:{
          "id":id,
          "inhome":inhome
        }
      })
        .pipe(
          catchError(this.handleError<Category>('addCategoryToMenu',null))
        );
    }

    /** GET categories  by KeyWord */
    getCategoriesByKeyword(keyword:string): Observable<Category[]> {
      return this.http.get<Category[]>(this.Url+"filterByKeyword/"+keyword)
        .pipe(
          catchError(this.handleError<Category[]>('getCategories', []))
        );
    }
  
    /** GET category by  id */
    getCategory (id:string): Observable<Category> {
      return this.http.get<Category>(this.Url+"getCategory/"+id)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET category by is  - Products by page */
    getCategoryByPage (id:string,page:number,sort:string,dir:string): Observable<Category> {
      return this.http.get<Category>(this.Url+"getCategory/"+id+"/"+page+"/"+sort+"/"+dir)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET category  by keyword and page */
    getCategoryByPageAndKeyword (keyword:string,id:string,page:number): Observable<Category> {
      return this.http.get<Category>(this.Url+"filterByKeywordAndCategory/"+keyword+"/"+id+"/"+page)
        .pipe(
          catchError(this.handleError<Category>('getCategories',null))
        );
    }
    /** GET subcategory by is */
    getSubCategory (id:string): Observable<SubCategory> {
      return this.http.get<SubCategory>(this.Url+"getSubCategory/"+id)
        .pipe(
          catchError(this.handleError<SubCategory>('getSubCategory',null))
        );
    }
    /** GET subcategory by id - products by page */
    getSubCategoryByPage (id:string,page:number,sort:string,dir:string): Observable<SubCategory> {
      return this.http.get<SubCategory>(this.Url+"getSubCategory/"+id+"/"+page+"/"+sort+"/"+dir)
        .pipe(
          catchError(this.handleError<SubCategory>('getSubCategory',null))
        );
    }
   /** DELETE: delete category  */
deleteCategory (id): Observable<Category> {
  return this.http.delete<Category>(this.Url+'deleteCategory',{
    params:{
      "id":id
    }
  })
    .pipe(
      catchError(this.handleError<Category>('deleteCategory', id))
    );
}
    /** DELETE: delete SubCategory */
  deleteSubCategory (id): Observable<SubCategory> {
    return this.http.delete<SubCategory>(this.Url+'deleteSubCategory',{
      params:{
        "id":id
      }
    })
      .pipe(
        catchError(this.handleError<SubCategory>('deleteSubCategory', id))
      );
  }
  /** GET Dashborad Products By Categories */
  DashboradProductsByCategories(): Observable<Object[]> {
    return this.http.get<Object[]>(this.Url+"DashboradProductsByCategories")
      .pipe(
        catchError(this.handleError<Object[]>('DashboradProductsByCategories', []))
      );
  }
  /** GET Dashborad Products By Categories */
  DashboradSubCategoriesByCategories(): Observable<Object[]> {
    return this.http.get<Object[]>(this.Url+"DashboradSubCategoriesByCategories")
      .pipe(
        catchError(this.handleError<Object[]>('DashboradSubCategoriesByCategories', []))
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
