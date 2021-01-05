import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Feature } from '../../_models/feature';
import { Env } from '../env';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  env : Env = new Env();
  Url = 'http://'+this.env.host+'/feature-service/';
  constructor(private http: HttpClient) { }
       /** POST: save Feature  */
       saveFeature (feature: Feature): Observable<Feature> {
        return this.http.post<Feature>(this.Url+'saveFeature', feature)
          .pipe(
            catchError(this.handleError<Feature>('saveFeature', feature))
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
