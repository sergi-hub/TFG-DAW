import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from "rxjs";
import CryptoJS from "crypto-js";
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  // REQUISITOS API MARVEL
  // claves API
  private publicKey:string='59290d622e95b4ff5ade5bd3490be29f';
  private privateKey:string="47575e7436c9a83f69b0dd9d91c296e2db90e197";

  // Generamos timestamp para las llamadas
  private timestamp=new Date().getTime().toString();

  // Generamos el hash para las llamadas 
  private hash = CryptoJS.MD5(this.timestamp + this.privateKey + this.publicKey).toString();

  // URL API
  private baseUrl:string="https://gateway.marvel.com/v1/public"; 

  // Variable para la paginacion
  private offset:string = '20';

  public page:string = '0';

  constructor(private http: HttpClient) {}

  /**
   * 
   * @param _pageNum contiene el número de la página para la url
   * @returns 
   */
  getCharacters(_pageNum:string): Observable<any> {
    this.page = parseInt(_pageNum)*parseInt(this.offset)+""; // Se calcula el offset según el número de página para generar la URL
    const url: string = `${this.baseUrl}/characters?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}&offset=${this.page}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (caracteres)
    return this.http.get(url);
  }

  /**
   * @param _id contiene el id del personaje para la url
   * @returns
   */
  getCharacter(_id:string): Observable<any> {
    // Se obtiene la URL para acceder a un caracter especifico
    const url: string = `${this.baseUrl}/characters/${_id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (caracter)
    return this.http.get(url);
  }

  /**
  * 
  * @param _pageNum contiene el número de la página para la url
  * @returns 
  */
  getComics(_pageNum:string): Observable<any> {
    this.page = parseInt(_pageNum)*parseInt(this.offset)+"";
    const url: string = `${this.baseUrl}/comics?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}&offset=${this.page}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (comics)
    return this.http.get(url);
  }

  /**
   * @param _id contiene el id del personaje para la url
   * @returns
   */
  getComic(_id:string): Observable<any> {
    // Se obtiene la URL para acceder a un caracter especifico
    const url: string = `${this.baseUrl}/comics/${_id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (caracter)
    return this.http.get(url);
  }

  /**
   * 
   * @param _pageNum contiene el número de la página para la url
   * @returns 
   */
  getEvents(_pageNum:string): Observable<any> {
    this.page = parseInt(_pageNum)*parseInt(this.offset)+"";
    const url: string = `${this.baseUrl}/events?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}&offset=${this.page}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (eventos)
    return this.http.get(url);
  }

  /**
   * @param _id contiene el id del personaje para la url
   * @returns
   */
  getEvent(_id:string): Observable<any> {
    // Se obtiene la URL para acceder a un caracter especifico
    const url: string = `${this.baseUrl}/events/${_id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (caracter)
    return this.http.get(url);
  }

  /**
   * 
   * @param _pageNum contiene el número de la página para la url
   * @returns 
   */
  getSeries(_pageNum:string): Observable<any> {
    this.page = parseInt(_pageNum)*parseInt(this.offset)+"";
    const url: string = `${this.baseUrl}/series?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}&offset=${this.page}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (series)
    return this.http.get(url);
  }

  /**
   * @param _id contiene el id del personaje para la url
   * @returns
   */
  getSerie(_id:string): Observable<any> {
    // Se obtiene la URL para acceder a un caracter especifico
    const url: string = `${this.baseUrl}/series/${_id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    // Se devuelve un Observable con los resultados de la solicitud a la URL (caracter)
    return this.http.get(url);
  }

  /**
   * 
   * @param _collectionURI1 contiene una URI de una colección de datos
   * @param _collectionURI2 contiene una URI de una colección de datos
   * @returns 
   */
  getItems(_collectionURI1:string, _collectionURI2:string): Observable<any[]> {
    const _request1 = this.http.get(_collectionURI1 + `?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`); // Se almacena la llamada a la colección 1
    const _request2 = this.http.get(_collectionURI2 + `?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`); // Se almacena la llamada a la colección 2

    return forkJoin([_request1, _request2]); // Se devuelve el resultado de las llamadas en una sola solicitud gracias al forkJoin
  }


  /**
   * Se van a cargar los articulos del usuario haciendo las llamadas a la api a partir del id del arcitulo y el tipo (serie, comic...)
   * @param articles contiene los id y tipo de aritculo de cada articulo que tiene guardado en la base de datos el usuario
   * @returns 
   */
  getSavedArticles(articles: any[]): Observable<any> {
    const chargedArticles: any[] = [];

    const requests = articles.map((article) => {
    const url = `${this.baseUrl}/${article.type}/${article.code}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  });

  return forkJoin(requests).pipe(
    map((responses: any[]) => {
      responses.forEach((response) => {
        chargedArticles.push(response.data.results);
      });
      return chargedArticles;
    })
  );
  }



}
