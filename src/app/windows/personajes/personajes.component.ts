import { Component } from '@angular/core';
import { HomeService } from 'src/services/home/home.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent {

  private characters: any [] = [];
  private charged: boolean = false;

  constructor(private home: HomeService, private http: HttpClient) { }

  ngOnInit() {
    this.home.getCharacters().subscribe(resultados => {
      try {
        this.characters = resultados.data.results;
        this.charged = true;
        console.log(this.characters);
      } catch (e) {
        console.log("Ha habido un problema: " + e);
      }

    })
  }


}
