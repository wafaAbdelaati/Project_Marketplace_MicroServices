import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Env } from '../env';
import { Admin } from 'src/app/_models/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  env : Env = new Env();
  private Url = 'http://'+this.env.host+'/user-service/';
  constructor(private http: HttpClient) { }

     /** POST: add a new super admin  */
addSuperAdmin (admin: Admin): Observable<Admin> {
  return this.http.post<Admin>(this.Url+'saveSuperAdmin', admin)
    .pipe(
      catchError(this.handleError<Admin>('saveSuperAdmin', admin))
    );
}
     /** POST: Update  super admin  */
     addAdmin (admin: Admin): Observable<Admin> {
      return this.http.post<Admin>(this.Url+'saveAdmin', admin)
        .pipe(
          catchError(this.handleError<Admin>('saveAdmin', admin))
        );
    }
   /** GET: Get a  superAdmin  */
   getSuperAdmin(): Observable<Admin> {
    return this.http.get<Admin>(this.Url+'getSuperAdmin' )
      .pipe(
        catchError(this.handleError<Admin>('getSuperAdmin', null))
      );
  }
   /** GET: Find a  Super Admin For Login */
 FindAdmin (admin: Admin): Observable<Admin> {
  return this.http.get<Admin>(this.Url+'findSuperAdmin', {
    params:{
      "mail":admin.mail,
      "password":admin.password
    }
  })
    .pipe(
      catchError(this.handleError<Admin>('findSuperAdmin', admin))
    );
}
   /** GET: Get an  Admin  */
   getAdmin(id): Observable<Admin> {
    return this.http.get<Admin>(this.Url+'getAdmin/'+id )
      .pipe(
        catchError(this.handleError<Admin>('getAdmin', null))
      );
  }
  /** GET: delete  Admin  */
  deleteAdmin(id): Observable<Admin> {
    return this.http.get<Admin>(this.Url+'deleteAdmin/'+id )
      .pipe(
        catchError(this.handleError<Admin>('deleteAdmin', null))
      );
  }
   /** GET: Find all  admin */
   allAdmin(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.Url+'allAdmin' )
      .pipe(
        catchError(this.handleError<Admin[]>('allAdmin',null))
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
