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
  characters: any[] = [];
  comics: any[] = [];
  events: any[] = [];
  series: any[] = [];
  charged: boolean = false;

  
  validNum: Array<Array<number>> = [
    [5, 15, 16, 17],
    [1, 2, 4, 10, 15],
    [5, 8, 13, 15]
  ];

  serieNum: number = 0;
  charactersNum: number = 0;
  comicsNum: number = 0;
  eventNum: number = 0;

  constructor(private homeService: HomeService) {}

  /**
   * Hacemos las llamadas a la API y una vez estén todas hechas
   * se cambia el valor de la variable charged a true para que se muestren
   * los datos en el template y no aparezcan errores en consola
   */
  ngOnInit() {

    //Esto de abajo lo hago para asegurarme que las tarjetas del home
    //que sirven como presentación, no puedan aparecer tarjetas sin descripción,
    //para dar mejor imagen a la web al entrar
    this.serieNum = this.validNum[0][Math.round(Math.random() * 4)];
    this.charactersNum = this.validNum[1][Math.round(Math.random() * 5)];
    this.comicsNum = this.validNum[2][Math.round(Math.random() * 4)];
    this.eventNum = Math.round(Math.random() * 20);

    const llamada1 = this.homeService.getCharacters();
    const llamada2 = this.homeService.getComics();
    const llamada3 = this.homeService.getEvents();
    const llamada4 = this.homeService.getSeries();

    forkJoin([llamada1, llamada2, llamada3, llamada4])
      .subscribe(resultados => {
        try {
          this.characters = resultados[0].data.results;
          this.comics = resultados[1].data.results;
          this.events = resultados[2].data.results;
          this.series = resultados[3].data.results;
          console.log(this.series);
          console.log(this.characters);
          console.log(this.comics);
          console.log(this.events);
          this.charged = true;
        } catch (e) {
          console.log("Ha habido un problema: " + e);
        }

      })
  }
}


