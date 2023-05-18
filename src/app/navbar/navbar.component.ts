import { Component } from '@angular/core';
import { HomeService } from 'src/services/home/home.service';
import { SharedService } from 'src/services/shared.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/services/route.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public page: string = '';

  public inputValue: string = ''; // Contiene el valor del input de busqueda o filtrado

  public inputDisabled: boolean = false;

  constructor(private home: HomeService, public shared: SharedService, private route: ActivatedRoute, private actualRoute: RouteService, public user: UsersService) {
    this.page = home.page; //Obtiene la página por defecto del servicio Home (0)
  }

  ngOnInit(): void{
    // Nos suscribimos a la variable currentRoute, con la cual sabremos cuando cambia la ruta, además de poder obtenerla
    this.actualRoute.currentRoute$.subscribe(route => {
      this.inputValue = ''; // Al cambiar de ruta, reseteamos el valor de la variable para que el buscador se limpie al cambiar de página

      // Comprobamos si estamos en la página en la que se muestran los personajes, comics etc, para que se active o desactive el buscador, ya que su funcionamiento solo se encuentra en dichas paginas 
      if(route.split('/')[2] === 'page'){
        this.inputDisabled = false;
      }else{
        this.inputDisabled = true;
      }
    });
  }

  /**
   * Se ejecuta el método que hay en el servicio que le da el valor del input de busqueda
   */
  updateInputValue(): void{
    this.shared.setInputValue(this.inputValue);
  }

  /**
   * Método para limpiar el campo del input
   */
  clearInput(): void{
    this.inputValue = '';
    this.updateInputValue();
  }

}
