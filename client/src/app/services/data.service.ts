import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { InputData } from '../data.structures';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    inputData: InputData;
    currentUrl = '/data/weather/current';
    forecastUrl = '/data/weather/forecast';

    httpOptions = {
        headers: new HttpHeaders( {'Content-Type': 'application/json'} )
    };

    constructor( private http: HttpClient ) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    getCurrent(userInput: InputData) {
        const city = userInput.city;
        const country = userInput.country;
        const url = this.currentUrl + '/' + city + '/' + country;
        return this.http.get<any>(url)
          .pipe(
              catchError( this.handleError('getCurrent', undefined) )
          );
    }

    getForecast(userInput: InputData) {
        const city = userInput.city;
        const country = userInput.country;
        const url = this.forecastUrl + '/' + city + '/' + country;
        return this.http.get<any>(url)
          .pipe(
              catchError( this.handleError('getForecast', undefined) )
          );
    }
}
