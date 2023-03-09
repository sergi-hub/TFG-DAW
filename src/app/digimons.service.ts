import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Axios } from 'axios';

import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DigimonsService {

  constructor(public httpClient:HttpClient) { }

  //private API_SERVER = "https://digimon-api.vercel.app/api/digimon";

  // private API_SERVER = "https://media.api-sports.io/football/venues";

  // public getDigimones():Observable<any>{
  //   return this.httpClient.get(this.API_SERVER);
  // }






}
