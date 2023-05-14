import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  inputValueSubject: Subject<string> = new Subject<string>(); // Objeto que actua como observable
  inputValue$ = this.inputValueSubject.asObservable(); // Variable a la que se le pasara el valor del objeto anterior

  constructor() { }

  /**
 * Se le da un valor al inputValueSubject a partir del dato que se le pasa
 * luego se le da valor a inputValue$ como obserable
 * @param value valor del input de busqueda o filtrado
 */
  setInputValue(value: string){
    this.inputValueSubject.next(value);
    this.inputValue$ = this.inputValueSubject.asObservable();
  }

}
