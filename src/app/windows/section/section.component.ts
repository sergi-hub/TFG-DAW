import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';
import { NullOrEmptyPipe } from 'src/pipes/nullOrEmpty';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  public nombreRuta: string = ""; // Nombre de la ruta actual 
  public resultados: any[] = []; // Array que contiene los resultados obtenidos de la llamada al servicio

  public pageNum: number = 0; // Número de la página

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private home: HomeService) {
    this.nombreRuta = this.route.snapshot.url[0].path; // Se asigna el nombre de la ruta actual
  }

  ngOnInit() {
    // Nos suscribimos a los parámetros de la ruta para que cuando esta cambie, aparezcan nuevos datos en la pantalla
    this.route.params.subscribe(params => {
      this.pageNum = +params['pg'];
      this.compruebaUrl();
    });
  }

  /**
   * Verifica el nombre de la ruta actual y se realiza la llamada a la API
   */
  compruebaUrl(){
    if(this.nombreRuta === 'characters'){ // Para caracteres
      this.home.getCharacters(this.pageNum+"")
        .subscribe(data =>{
          this.resultados = data.data.results;
        })
    }else if(this.nombreRuta === 'events'){ // Para eventos
      this.home.getEvents(this.pageNum+"")
        .subscribe(data =>{
          this.resultados = data.data.results;
        })
    }else if(this.nombreRuta === 'comics'){ // Para comics
      this.home.getComics(this.pageNum+"")
        .subscribe(data =>{
          this.resultados = data.data.results;
        })
    }else if(this.nombreRuta === 'series'){ // Para series
      this.home.getSeries(this.pageNum+"")
        .subscribe(data =>{
          this.resultados = data.data.results;
        })
    }
  }

}
