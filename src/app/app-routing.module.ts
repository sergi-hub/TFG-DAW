import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './windows/home/home.component';
import { SectionComponent } from './windows/section/section.component';
import { ItemDetailComponent } from './windows/item-detail/item-detail.component';
import { LoginComponent } from './windows/login/login.component';
import { ProfileComponent } from './windows/profile/profile.component';
import { ErrorComponent } from './windows/error/error.component';
import { TermsAndConditionsComponent } from './windows/terms-and-conditions/terms-and-conditions.component';

// Define las rutas de la aplicación
const routes: Routes = [
  { path: "", component:HomeComponent}, // Ruta para la página de inicio
  { path: "characters/page/:pg", component:SectionComponent}, // Ruta para la sección de personajes
  { path: "characters/:id", component:ItemDetailComponent}, //Ruta para un personaje específico
  { path: "events/page/:pg", component:SectionComponent}, // Ruta para la sección de eventos
  { path: "events/:id", component:ItemDetailComponent}, //Ruta para un evento específico
  { path: "series/page/:pg", component:SectionComponent}, // Ruta para la sección de series
  { path: "series/:id", component:ItemDetailComponent}, //Ruta para una serie específica
  { path: "comics/page/:pg", component:SectionComponent}, // Ruta para la sección de comics
  { path: "comics/:id", component:ItemDetailComponent}, //Ruta para un cómic específico
  { path: "login", component:LoginComponent}, //Ruta para la pantalla de login/registro
  { path: "login/:register", component:LoginComponent},
  { path: "profile", component:ProfileComponent }, //Ruta para la pantalla del perfil
  { path: "terms", component:TermsAndConditionsComponent}, //Ruta para la pantalla de terminos y condiciones
  { path: "**", component:ErrorComponent} //Ruta para la pantalla de página no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
