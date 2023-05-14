import { HttpClient } from '@angular/common/http';
import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  public nombreRuta: string = ""; // Nombre de la ruta actual 
  public resultados: any[] = []; // Array que contiene los resultados obtenidos de la llamada al servicio
  public filteredResults: any[] = []; //Array que contiene los resultados del servicio, pero filtrados

  public pageNum: number = 0; // Número de la página

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private home: HomeService, private shared: SharedService) {
    this.nombreRuta = this.route.snapshot.url[0].path; // Se asigna el nombre de la ruta actual
  }

  ngOnInit() {
    // Nos suscribimos a los parámetros de la ruta para que cuando esta cambie, aparezcan nuevos datos en la pantalla
    this.route.params.subscribe(params => {
      this.filteredResults = []; // Se vacia el array del filtro, para que cargue los nuevos items
      this.pageNum = +params['pg'];
      this.compruebaUrl();
    });


    // Nos suscribimos a la variable del servicio para que cuando cambie, se ejecute un método
    this.shared.inputValue$.subscribe(data => {
      setTimeout(() => { // Hacemos un pequeño timeout para que no ejecute el método al instante
        this.filterResults(data);
      }, 500);

    });

  }



  /**
   * Verifica el nombre de la ruta actual y se realiza la llamada a la API
   */
  compruebaUrl() {
    if (this.nombreRuta === 'characters') { // Para caracteres
      this.home.getCharacters(this.pageNum + "")
        .subscribe(data => {
          this.resultados = data.data.results;
        })
    } else if (this.nombreRuta === 'events') { // Para eventos
      this.home.getEvents(this.pageNum + "")
        .subscribe(data => {
          this.resultados = data.data.results;
        })
    } else if (this.nombreRuta === 'comics') { // Para comics
      this.home.getComics(this.pageNum + "")
        .subscribe(data => {
          this.resultados = data.data.results;
        })
    } else if (this.nombreRuta === 'series') { // Para series
      this.home.getSeries(this.pageNum + "")
        .subscribe(data => {
          this.resultados = data.data.results;
        })
    }
  }

  /**
   * 
   * @param value contiene la cadena del input, la cual se usará para filtrar nuestros elementos
   */
  filterResults(value: string): void {
    // Comprobamos en que pagina estamos, ya que la variable del nombre de los items cambia (title o name)
    if (this.nombreRuta !== 'characters') {
      // Asignamos a filteredResults todos los items a los que se le aplique el filtro
      this.filteredResults = this.resultados.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      this.filteredResults = this.resultados.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    }
  }

}
