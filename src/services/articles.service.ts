import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private url: string = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) { }



  saveArticle(article: any) {
    console.log(article);
    this.http.post(this.url, article).subscribe(
      (response) => {
        console.log('Articulo guardado correctamente ' + response);
      },
      (error) => {
        console.log('Error al guardar el articulo ' + error);
      }
    )
  }

  getUserArticles(id: number): Observable<any>{
    return this.http.get(this.url + `/${id}`);
  }

  deleteUserArticle(fk_user: number, code: string): void{
    const url = `${this.url}/${fk_user}/${code}`;

    this.http.delete(url).subscribe(
      (response) => {
        console.log('Artículo eliminado correctamente ' + response);
      },
      (error) => {
        console.log('Error al eliminar el artículo ' + error);
      }
    )
  }
}
