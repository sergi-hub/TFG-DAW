import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {

  @Input() resultados: number = 0; // Número de resultados de la página acutal que se recibe como entrada

  private url: string = ''; // URL de la página actual

  public num: number = 0; // Número de la página actual

  constructor(private home:HomeService, private router:Router) {}

  ngOnInit() {
    this.num = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)); //Obtiene el número de la página actual a partir de la URL
  }

  /**
   * Obtiene la URL de la página siguiente o anterior, dependiendo del valor del parametro _aux
   * @param _aux para valor 'next' se obtiene la URL de la siguiente página, para 'prev' el de la anterior
   * @returns URL de la siguiente o anterior página
   */
  getUrl(_aux: string): string{
    let _afterLastSlash;
    this.url = this.router.url;

    const _lastSlashIndex = this.url.lastIndexOf('/');
    const _beforeLastSlash = this.url.substring(0, _lastSlashIndex)+'/';

    if(_aux === 'next'){
      _afterLastSlash = parseInt(this.url.substring(_lastSlashIndex + 1))+1;
    }else{
      _afterLastSlash = parseInt(this.url.substring(_lastSlashIndex + 1))-1;
    }
    
    this.url = _beforeLastSlash+_afterLastSlash;

    return this.url;
  }

  /**
   * Navega a la siguiente página y actualiza el número incrementandolo
   */
  nextPg(): void{
    const _newUrl = this.getUrl('next'); 

    this.router.navigate([_newUrl]);

    this.num++;

    window.scrollTo(0, 0);
  }

  /**
   * Navega a la anterior página y actualiza el número decrementandolo
   */
  prevPg(): void{
    const _newUrl = this.getUrl('prev');

    this.router.navigate([_newUrl]);

    this.num--;

    window.scrollTo(0, 0);
  }

  /**
   * Navega a la página que se especifique y actualiza el número de la actual página
   * @param _pgNum Número de página al que se desea navegar
   */
  btnPg(_pgNum: number): void{
    if(this.num === _pgNum){ // En el caso de que el número de página actual sea el mismo del que se desea navegar, no hará nada
      window.scrollTo(0, 0);
      return;
    }

    const _newUrl = this.router.url.substring(0, this.router.url.lastIndexOf('/'))+'/'+_pgNum;
    
    this.router.navigate([_newUrl]);

    if(_pgNum > this.num){ // Si se navega a la siguiente página, se incrementa el número de página
      this.num++;
    }else{ //Si se navega a la página anterior, se decrementa el número de página
      this.num--;
    }

    window.scrollTo(0, 0);
  }

}
