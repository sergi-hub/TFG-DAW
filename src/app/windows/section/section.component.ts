import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';
import { NullOrEmptyPipe } from 'src/pipes/nullOrEmpty';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['../home/home.component.css']//aqui pongo la ruta de los estilos que tengo en el css del home, ya que las tarjetas no cambian
})
export class SectionComponent {

  public nombreRuta: string = "";
  public resultados: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private home: HomeService) {
    this.nombreRuta = this.route.snapshot.url[0].path;
  }

  ngOnInit() {
    this.compruebaUrl();
  }

  compruebaUrl(){
    if(this.nombreRuta === 'characters'){
      this.home.getCharacters()
        .subscribe(data =>{
          this.resultados = data.data.results;
          console.log(this.resultados);
        })
    }else if(this.nombreRuta === 'events'){
      this.home.getEvents()
        .subscribe(data =>{
          this.resultados = data.data.results;
          console.log(this.resultados);
        })
    }else if(this.nombreRuta === 'comics'){
      this.home.getComics()
        .subscribe(data =>{
          this.resultados = data.data.results;
          console.log(this.resultados);
        })
    }else if(this.nombreRuta === 'series'){
      this.home.getSeries()
        .subscribe(data =>{
          this.resultados = data.data.results;
          console.log(this.resultados);
        })
    }
  }

}
