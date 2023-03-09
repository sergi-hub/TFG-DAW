import { Component, OnInit } from '@angular/core';
import { DigimonsService } from './digimons.service';

import { AxiosService } from './axios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  digimones: any;

  leagues: any;

  constructor(public digimon: DigimonsService, private axios:AxiosService) { 
    this.leagues = this.axios.leer();
  }

  ngOnInit() {
    // this.digimon.getDigimones().subscribe(
    //   r=>{
    //     this.digimones=r;
    //     console.log(r);
    //   },
    //   e=>{
    //     console.log(e);
    //   }
    // )

    
    console.log(this.leagues);
    console.log("hola");


  }

}
