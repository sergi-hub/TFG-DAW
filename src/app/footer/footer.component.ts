import { Component } from '@angular/core';
import { RouteService } from 'src/services/route.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private actualRoute: RouteService) {}

  ngOnInit() {
    this.actualRoute.currentRoute$.subscribe(data => {
      window.scrollTo(0, 0);
    });
  }

}
