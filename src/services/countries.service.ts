import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesUrl: string = 'http://localhost:3000/api/countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any>{
    return this.http.get(this.countriesUrl);
  }

  getUserCountrie(countryId: number, nick: string): Observable<any>{
    return this.http.get(this.countriesUrl + `/${countryId}/${nick}`)
  }

}
