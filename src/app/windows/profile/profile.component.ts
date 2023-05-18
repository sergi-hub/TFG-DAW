import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/services/articles.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public user: UsersService, private router: Router, private article: ArticlesService) {}

  ngOnInit(): void{
    if(!this.user.loged){
      this.router.navigate(['/login']);
    }
    console.log(this.user.chargedArticles);
  }

  /**
   * Método para eliminar los artículos
   * @param uri contiene la uri del articulo que se usará para identificarlo en la base de datos y eliminarlo
   */
  deleteArticle(uri: string): void{
    const code: string = uri.slice(uri.lastIndexOf('/')+1);
    this.article.deleteUserArticle(this.user.id, code);
    setTimeout(() => {
      this.user.chargeArticles();
    }, 100);
  }

  /**
   * Método para deslogear el usuario
   */
  logOut(): void{
    this.user.unsetUser();

    this.router.navigate(['']);
  }

}
