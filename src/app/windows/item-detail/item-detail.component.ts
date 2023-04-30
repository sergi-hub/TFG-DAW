import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  
  public urlParts: string[] = [];

  constructor(private home:HomeService, private route:Router) {
    this.urlParts = this.route.url.split('/'); // Contiene las partes de la URL que las separa ('/')
  }

  ngOnInit() {
    // IMPORTANTTTTTTTTT ES POT OPTIMIZAR, CREANT UN METODO QUE PASES TMB QUE URL ES I SUBSTITUINTO A LA URL PER AL HTTPGET******
    if(this.urlParts[1] === 'characters'){ // Se comprueba si la url pertenece a characters
      this.home.getCharacter(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del personaje a partir del Id
        console.log(resultados.data.results[0]);
      });
    }else if(this.urlParts[1] === 'events'){ // Se comprueba si la url pertenece a events
      this.home.getEvent(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del evento a partir del Id
        console.log(resultados.data.results[0]);
      });
    }else if(this.urlParts[1] === 'comics'){ // Se comprueba si la url pertenece a comics
      this.home.getCharacters(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del comic a partir del Id
        console.log(resultados.data.results[0]);
      });
    }else if(this.urlParts[1] === 'series'){ // Se comprueba si la url pertenece a series
      this.home.getSerie(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos de la serie a partir del Id
        console.log(resultados.data.results[0]);
      });
    }

    console.log(this.urlParts);

  }


}
