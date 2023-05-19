import { Component } from '@angular/core';
import { MarvelService } from 'src/services/marvel/marvel.service';
import { SharedService } from 'src/services/shared.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/services/route.service';
import { UsersService } from 'src/services/users.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public page: string = '';

  public inputValue: string = ''; // Contiene el valor del input de busqueda o filtrado

  public inputDisabled: boolean = false;

  private user: any[] = [];

  constructor(private home: MarvelService, public shared: SharedService, private route: ActivatedRoute, private actualRoute: RouteService, public users: UsersService) {
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


    const email = sessionStorage.getItem('email');
    const passwd = sessionStorage.getItem('passwd');
    if(email !== null && passwd !== null){
      this.users.getUser(email, passwd)
      .pipe(
        finalize(() => { // Esto se ejecutará al terminar el subscribe de abajo
          if(this.user.length !== 0){
            this.users.setUser(this.user[0]); // Mandamos los datos del usuario al servicio que los almacenará en variables
            //this.router.navigate(['']); // Navegamos a la ventana home
            console.log('Bienvenido ' + this.users.name);
          }
        })
      )
      .subscribe(data => {
        this.user = data;
      });
      console.log('He pasado por aqui');
    }

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
