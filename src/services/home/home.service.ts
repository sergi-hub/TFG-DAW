import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //claves API
  private publicKey:string='59290d622e95b4ff5ade5bd3490be29f';
  private privateKey:string="47575e7436c9a83f69b0dd9d91c296e2db90e197";

  //URL API
  private baseUrl:string="https://gateway.marvel.com/v1/public";

  //Generamos timestamp para las llamadas
  private timestamp=new Date().getTime().toString();

  //Generamos el hash para las llamadas
  private hash = CryptoJS.MD5(this.timestamp + this.privateKey + this.publicKey).toString();

  constructor(private http: HttpClient) {}

  /**
   * Este método devolverá la url para acceder a un personaje aleatorio
   * @returns any
   */
  getCharacters(): Observable<any> {
    const url:string = `${this.baseUrl}/characters?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }

  /**
   * Este método devolverá la url para acceder a un cómic aleatorio
   * @returns any
   */
  getComics(): Observable<any> {
    const url:string = `${this.baseUrl}/comics?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }


  getEvents(): Observable<any> {
    const url:string = `${this.baseUrl}/events?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }


  getSeries(): Observable<any> {
    const url:string = `${this.baseUrl}/series?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }



}
