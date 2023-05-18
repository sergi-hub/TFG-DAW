import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { user } from 'src/app/windows/login/user';
import { CountriesService } from './countries.service';
import { ArticlesService } from './articles.service';
import { HomeService } from './home/home.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = 'http://localhost:3000/api/user';

  /* Variables del usuario logeado */
  public id: number = -1;
  public name: string = '';
  public nick: string = '';
  public email: string = '';
  public creation: string = '';
  public country_id: number = -1;
  public country: string = '';
  
  public savedArticles: any[] = []; // Contiene los identificadores de los articulos que ha guardado el usuario, estos se pasaran y los obtendremos de la api
  public chargedArticles: any[] = []; // Contiene los datos de los articulos guardados, de aquí se muestra la información (titulo e imagen)

  public loged: boolean = false; // Variable de referencia para saber cuando hay un usuario logeado o no

  public uris: string[] = []; // Aqui se guardan las uris de los artículos para poder asignarle la ruta correspondiente
  public codes: string[] = []; // Contiene los codigos de las uris para bloquear los botones de guardar si ya lo tiene guardado el usuario

  constructor(private http: HttpClient, private countries: CountriesService, private articles: ArticlesService, private home: HomeService) { }


  /**
   * Este método se encarga de enviar la información del usuario que se esta registando a la api para que ésta,
   * la guarde en la BBDD
   * @param user Contiene la información del usuario
   * @returns 
   */
  insertUser(user: user): Observable<boolean> {
   return this.http.post(this.url+'s/', user).pipe(
      map(() => {
        console.log('Usuario insertado correctamente');
        return true;
      }),
      catchError((error) => {
        console.error('Error al insertar el usuario', error);
        return of(false);
      })
    );
  }

  /**
   * Este método hace una llamada a la api en la que se devuelven todos los registros que contengan alguno de los valores que le pasamos,
   * sirve para comprobar si el usuario que esta siendo registrado ya existe
   * @param nick contiene el nombre del usuario
   * @param email contiene el correo del usuario
   * @returns 
   */
  getUsers(nick: string, email: string): Observable<any>{
    return this.http.get(this.url + `s/${nick}/${email}`);
  }

  /**
   * Este método hace una llamada a la api que devuelve un array con 1 usuario o con 0 si no existe,
   * sirve para logear al usuario comprobando correo y contraseña
   * @param email contiene el email del usuario
   * @param passwd contiene la contraseña del usuario
   * @returns 
   */
  getUser(email: string, passwd: string): Observable<any>{
    return this.http.get(this.url + `/${email}/${passwd}`);
  }


  /**
   * Este método hace una llamada a la api que se encarga de devolvernos de la base de datos algun campo que coincida
   * con el correo que le hemos pasado.
   */
  getUserEmail(email: string): Observable<any>{
    return this.http.get(this.url + `/${email}`)
  }

  /**
   * Este método envia el correo electróncio a través de la api
   * @param body contiene el email y la contraseña de recuperación
   * @returns 
   */
  sendUserEmail(body: any): Observable<boolean>{
    return this.http.post('http://localhost:3000/api/send-email', body).pipe(
      map(() => {
        console.log('Correo enviado correctamente');
        return true;
      }),
      catchError((error) => {
        console.error('Error al enviar el correo', error);
        return of(false);
      })
    );
  }


  /**
   * Este método se usará para asignar los valores del usuario cuando se logee, ya que en este servicio se almacenarán sus datos
   * @param object contiene los valores del usuario
   */
  setUser(object: any){
    this.id = object.id;
    this.name = object.name;
    this.nick = object.nick;
    this.email = object.email;
    this.creation = object.creation;
    this.country_id = object.fk_country;


    this.countries.getUserCountrie(this.country_id, this.nick).subscribe(data => {
      this.country = data[0].countryName;
    });

    sessionStorage.setItem('email', object.email);
    sessionStorage.setItem('passwd', object.passwd);

   this.chargeArticles();

    this.loged = true;
  }

  /**
   * Método para eliminar los datos del usuario al cerrar sesión
   */
  unsetUser(): void{
    this.id = -1;
    this.name = '';
    this.nick = '';
    this.email = '';
    this.creation = '';
    this.country_id = -1;
    this.loged = false;

    sessionStorage.clear();

    this.savedArticles = [];
    this.chargedArticles = [];
  }


  /**
   * Se obtiene la url de cada artículo para ponerlo en la ruta de su enlace
   * Separa la url que se obtiene en la api de marvel de cada articulo, y luego junta el tipo (comic, eventol...), con el id
   * para poder viajar a la ruta de dicho artículo
   */
  getURI(): void{
    let _lastPosition: number = 0;
    let _penultimatePosition: number = 0;
    let _URI: string = '';

    this.uris = []; // Se vacia el array, para que cuando se guarde un nuevo articulo, se refresquen los datos y aparezca el nuevo al instante en el perfil
    this.codes = [];

    for (let index = 0; index < this.chargedArticles.length; index++) { // Se recorre el array de items
      _lastPosition = this.chargedArticles[index][0].resourceURI.lastIndexOf('/');
      _penultimatePosition = this.chargedArticles[index][0].resourceURI.slice(0, _lastPosition).lastIndexOf('/');
      _URI = this.chargedArticles[index][0].resourceURI.slice(_penultimatePosition);

      this.codes.push(_URI.slice(_URI.lastIndexOf('/')+1)); // Se guardan los codigos de los artículos

      this.uris.push(_URI); // Se guarda la cadena generada
    } 
  }


  /**
   * Método que carga los artículos guardados de la BBDD
   */
  chargeArticles(): void{
     // Obtenemos los articulos del usuario pasandolo el id del usuario para que se haga la llamada a la api
    this.chargedArticles = []; // Tenemos que limpiar el array para cargar los datos de nuevo, por si se ha añadido uno o eliminado

     this.articles.getUserArticles(this.id)
     .pipe(
       finalize(() => { // Una vez finalizado, se haran las llamadas a la api de marvel para cargar las imagenes titulos.....
        console.log(this.savedArticles);
         this.home.getSavedArticles(this.savedArticles)
           .pipe(
             finalize(() => { // Una vez cargadas las urls de las imagenes, los titulos y demás, se ejecutara el siguiente método
               this.getURI();
               console.log('aqui abajo');
               console.log(this.chargedArticles);
             })
           )
         .subscribe(data => {
          
           this.chargedArticles = data;
         })
       })
     ).subscribe(data => {
       this.savedArticles = data;
     });
  }

}
