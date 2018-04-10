import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITypeProbleme } from './typeprobleme';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TypeproblemeService {
  private baseUrl = 'api/problemes';
  constructor(private _http: HttpClient) { }
  
  obtenirProblemes(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl)
        .do(data => console.log('obtenirCategories: ' + JSON.stringify(data)))
        .catch(this.handleError);

  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    return Observable.throw(err.message);
  }
}
