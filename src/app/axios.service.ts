import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {


  constructor() { }

  leer() {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/leagues',
      headers: {
        'x-rapidapi-key': 'd27609dcc409a41b2ca5c254a5f935c0',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };

    axios(config)
      .then(function (response:any) {
        console.log(JSON.stringify(response.data));
        console.log("funciona");
      })
      .catch(function (error:any) {
        console.log(error);
      });

  }

}
