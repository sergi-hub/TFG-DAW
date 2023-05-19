import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private routeChangedSubject: Subject<string> = new Subject<string>();
  public currentRoute$: Observable<string> = this.routeChangedSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {

    // Nos suscribimos al evento de router NavigationEnd, el cual indica cuando se va de una pagina a otra, si la navegación ha sido finalizada
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
      )
      .subscribe(route => {
        // Se emite la ruta actual a los observadores para que sepan que ha cambiado
        this.routeChangedSubject.next(route.url);
      });
  }
}
