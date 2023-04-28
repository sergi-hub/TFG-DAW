import { Component } from '@angular/core';
import { HomeService } from 'src/services/home/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public page: string = '';

  constructor(private home: HomeService) {
    this.page = home.page; //Obtiene la página por defecto del servicio Home (0)
  }

}
