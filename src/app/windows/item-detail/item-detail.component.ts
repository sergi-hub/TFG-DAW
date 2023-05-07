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
  public uris: string[] = [];

  public item: any; // Contiene el elemento principal que se muestra en la vista
  public items: any[] = []; // Contiene los elementos de "comics o series en las que aparece...."

  public cargado: boolean = false;

  // Se debe crear este objeto ya que hacerlo directamente se encuentra deprecated
  public observer = {
    next: (resultados: any[]) => {
      this.items = [...resultados[0].data.results, ...resultados[1].data.results];
    },
    error: (error: any) => {
      console.error('Error en la carga de datos', error);
      this.cargado = true;
    },
    complete: () => {
      console.log('Carga de datos completada');
      this.getURI();
      this.cargado = true; 
    }
  };

  constructor(private home:HomeService, private route:Router) {
    this.urlParts = this.route.url.split('/'); // Contiene las partes de la URL que las separa ('/')
    //console.log(this.urlParts);
  }

  ngOnInit() {
    this.getData();
  }


  /**
   * Se obtiene la información del personaje, comic, evento o serie a partir de la url
   */
  getData(): void{
    if(this.urlParts[1] === 'characters'){ // Se comprueba si la url pertenece a characters
      this.home.getCharacter(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del personaje a partir del Id
        this.item = resultados.data.results[0];

        this.home.getItems(this.item.comics.collectionURI, this.item.series.collectionURI).subscribe(this.observer);
      }); 
    }else if(this.urlParts[1] === 'events'){ // Se comprueba si la url pertenece a events
      this.home.getEvent(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del evento a partir del Id
        this.item = resultados.data.results[0];

        this.home.getItems(this.item.characters.collectionURI, this.item.comics.collectionURI).subscribe(this.observer);
      });
    }else if(this.urlParts[1] === 'comics'){ // Se comprueba si la url pertenece a comics
      this.home.getComic(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos del comic a partir del Id
        this.item = resultados.data.results[0];

        this.home.getItems(this.item.characters.collectionURI, this.item.series.resourceURI).subscribe(this.observer);
      });
    }else if(this.urlParts[1] === 'series'){ // Se comprueba si la url pertenece a series
      this.home.getSerie(this.urlParts[2]).subscribe(resultados => { // Se obtienen los datos de la serie a partir del Id
        this.item = resultados.data.results[0];
        
        this.home.getItems(this.item.characters.collectionURI, this.item.comics.collectionURI).subscribe(this.observer); 
      });
    }
  }

  /**
   * Se Obtiene la cadena que hay después de la penúltima '/'
   */
  getURI(): void{
    let _lastPosition: number = 0;
    let _penultimatePosition: number = 0;
    let _URI: string = '';
    for (let index = 0; index < this.items.length; index++) { // Se recorre el array de items
      _lastPosition = this.items[index].resourceURI.lastIndexOf('/');
      _penultimatePosition = this.items[index].resourceURI.slice(0, _lastPosition).lastIndexOf('/');
      _URI = this.items[index].resourceURI.slice(_penultimatePosition);

      this.uris.push(_URI); // Se guarda la cadena generada
    } 
  }



}
