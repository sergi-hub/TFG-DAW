import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/services/home/home.service';
import { lastSlashFilter } from 'src/pipes/lastSlashFilter.pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Variables para almacenar los datos de la API
  characters: any[] = [];
  comics: any[] = [];
  events: any[] = [];
  series: any[] = [];

  // Variable para indicar si los datos ya estan cargados o no
  charged: boolean = false;

  // Array de números para elegir de forma aleatoria una serie, personaje y cómic para mostrarlo en el home y que si tenga todo el contenido (img y descripción)
  validNum: Array<Array<number>> = [
    [5, 15, 16, 17], // series
    [1, 2, 4, 10, 15], // personajes
    [5, 8, 13, 15] // cómics
  ];

  // Variables que almacenarán el número aleatorio escogido
  serieNum: number = 0;
  charactersNum: number = 0;
  comicsNum: number = 0;
  eventNum: number = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    // Se elige de forma aleatoria una serie, personaje, comic y evento
    this.serieNum = this.validNum[0][Math.round(Math.random() * 3)];
    this.charactersNum = this.validNum[1][Math.round(Math.random() * 4)];
    this.comicsNum = this.validNum[2][Math.round(Math.random() * 3)];
    this.eventNum = Math.round(Math.random() * 20);

    // Se realizan las llamadas a la API
    const llamada1 = this.homeService.getCharacters("0");
    const llamada2 = this.homeService.getComics("0");
    const llamada3 = this.homeService.getEvents("0");
    const llamada4 = this.homeService.getSeries("0");

    // Se utiliza forkJoin para asegurarnos de que las llamadas estan realizadas antes de intentar mostrar datos en el template
    forkJoin([llamada1, llamada2, llamada3, llamada4])
      .subscribe(resultados => {
        try {
          this.characters = resultados[0].data.results;
          this.comics = resultados[1].data.results;
          this.events = resultados[2].data.results;
          this.series = resultados[3].data.results;
          
          this.charged = true; // Variable para indicar que ya se han hecho las llamadas
        } catch (e) {
          console.log("Ha habido un problema: " + e);
        }

      })
  }
}


