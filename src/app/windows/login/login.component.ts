import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/services/countries.service';
import { RouteService } from 'src/services/route.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { user } from './user';
import { UsersService } from 'src/services/users.service';
import { finalize, isEmpty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  /* Variables para los pattern */
  private textPattern = /^[A-Za-z]+$/;
  private textPattern2 = /^[A-Za-z0-9_-]+$/;

  /* Variables para ocultar o mostrar la plantilla */
  public login: boolean = false;
  public register: boolean = true;
  public lostPasswd: boolean = true;

  // Contiene los paises del desplegable
  public countries: any[] = [];

  // Contiene el resultado del usuario si existe
  private results: any[] = [];

  // Variable que contiene los datos del usuario logeado
  private user: any[] = [];

  // Indica si existe el usuario o no para mostrar el mensaje en la vista
  public exists: boolean = false;

  public emailExists: boolean = true;

  // Indica si ha habido un error al insertar el usuario
  public error: boolean = false;
  //Indica si ha ido bien la insercion del usuaio
  public successful: boolean = false;

  // Variable que contiene el formulario
  registerForm: FormGroup;
  sesionForm: FormGroup;
  recoverForm: FormGroup;

  constructor(private route: ActivatedRoute, private countrie: CountriesService, private formBuilder: FormBuilder, private users: UsersService, private router: Router) {
    // Obtenemos los paises del desplegable haciendo la llamada a la api
    this.countrie.getCountries().subscribe(data => {
      this.countries = data;
    });

    // Asignamos a registerForm como que es un formBuilder, le damos nombre a todos los campos y le pasamos todas las validaciones que debe hacer por cada campo
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      nick: ['', [Validators.required, Validators.pattern(this.textPattern2), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      email2: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
      passwd: ['', [Validators.required, Validators.pattern(this.textPattern2), Validators.minLength(8)]],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: [this.compareEmail] });


    this.sesionForm = this.formBuilder.group({
      email: ['sergisignes2002@gmail.com', [Validators.required, Validators.email]],
      passwd: ['11111111', [Validators.required, Validators.pattern(this.textPattern2)]]
    });

    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit() {
    // Segun la ruta en la que nos encontremos, se mostrará una cosa u otra en la vista
    this.route.params.subscribe(params =>{
      if(!params['register']){
        this.login = false;
        this.register = true;
        this.lostPasswd = true;
      }else{
        if(params['register'][0] === '1'){
          this.login = true;
          this.register = false;
          this.lostPasswd = true;
        }else{
          this.login = true;
          this.register = true;
          this.lostPasswd = false;
        }
      }
    });

  }

  /**
   * Se verifica si los dos campos de email coinciden, en ese caso, la validacion estará correcta
   * @param formGroup le pasamos el formulario en el que se llama
   * @returns boolean | null
   */
  compareEmail(formGroup: FormGroup): ValidationErrors | null {
    const email = formGroup.get('email')?.value;
    const email2 = formGroup.get('email2')?.value;

    if (email !== email2) {
      return { differentEmails: true };
    }
  
    return null;
  }

  /**
   * Método para el submit del registro, si se entra aquí, es que todas las comprobaciones de los campos son correctas,
   * lo primero que se hará será hacer una llamada a la api para obtener un registro si es que existe, pasandole el usuario
   * que se ha introducido en los campos y el email, una vez cargado, si ha devuelto algo, se informara de que el usuario ya existe
   * sino, se creará
   */
  submitRegisterForm(): void{
    this.users.getUsers(this.registerForm.get('nick')?.value, this.registerForm.get('email')?.value)
      .pipe(
        finalize(() => { // Esto se ejecutará al terminar el subscribe de abajo
          console.log('ha terminado');
          console.log(this.results);

          // Se comprueba si hay algun usuario que ya existe, si es 0 se insertará el usuario
          if(this.results.length === 0){
            const User = new user(
              this.registerForm.get('name')?.value,
              this.registerForm.get('nick')?.value,
              this.registerForm.get('email')?.value,
              this.registerForm.get('email2')?.value,
              this.registerForm.get('nationality')?.value,
              this.registerForm.get('passwd')?.value,
              this.registerForm.get('acceptTerms')?.value,
              );
      
            this.users.insertUser(User).subscribe((success) => {
              if(success){
                this.successful = true;
                this.router.navigate(['/login']);
              }else{
                this.error = true;
              }
            });
            
          }else{
            this.exists = true;
          }

        })
      )
      .subscribe(data => { // Obtenemos algun usuario si existe con las mismas credenciales
        this.results = data;
      })
  }

  /**
   * Este es el método que se ejecuta al enviar el formulario de login, en el se hace una llamada a la api, se comprueba si existe el usuario, si existe se logea,
   * en caso contrario, mostrará un mensaje
   */
  submitLogin(): void {
    this.users.getUser(this.sesionForm.get('email')?.value, this.sesionForm.get('passwd')?.value)
      .pipe(
        finalize(() => { // Esto se ejecutará al terminar el subscribe de abajo
          if(this.user.length !== 0){
            this.users.setUser(this.user[0]); // Mandamos los datos del usuario al servicio que los almacenará en variables
            this.router.navigate(['']); // Navegamos a la ventana home
            console.log('Bienvenido ' + this.users.name);
          }
        })
      )
      .subscribe(data => {
        this.user = data;
      });
  }


  /**
   * Método que se ejecuta al enviar el formulario de recuperación de contraseña
   * Se comprueba que el correo se encuentra registrado para enviarle la contraseña
   */
  submitRecoverForm(): void{
    let info: any;
    let successful: boolean;

    // Con el finalize, nos aseguramos a que ha terminado la llamada y tenemos los datos
    this.users.getUserEmail(this.recoverForm.get('email')?.value)
      .pipe(
        finalize(() => {
          if(info.length !== 0){ // Comprobamos que el usuario existe
            const body = {
              to: info[0].email,
              body: info[0].passwd
            }

            // Una vez finalizado el envio, mostramos un mensaje al usuario
            this.users.sendUserEmail(body)
              .pipe(
                finalize(() => {
                  if(successful){
                     alert('Correo enviado satisfactoriamente, por favor, revise la bandeja de entrada de su correo electrónico');
                     this.router.navigate(['/login']);
                  }
                })
              )
              .subscribe(data =>{
                successful = data;
            });

          }else{ // Si no existe mostraremos un mensaje al usuario
            console.log('Correo inexistente');
            this.emailExists = false;
          }
        })
      ).subscribe(data => {
         info = data;
      });
  }


}

