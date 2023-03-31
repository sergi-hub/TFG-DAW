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

  randomNum: number = 0;

  constructor(private homeService: HomeService) {}

  /**
   * Hacemos las llamadas a la API y una vez estén todas hechas
   * se cambia el valor de la variable charged a true para que se muestren
   * los datos en el template y no aparezcan errores en consola
   */
  ngOnInit() {
    this.randomNum = Math.round(Math.random() * 20);

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
          this.charged = true;
        } catch (e) {
          console.log("Ha habido un problema: " + e);
        }

      })
  }
}


