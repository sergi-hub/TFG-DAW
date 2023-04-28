import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './windows/home/home.component';
import { SectionComponent } from './windows/section/section.component';

// Define las rutas de la aplicación
const routes: Routes = [
  { path: "", component:HomeComponent}, // Ruta para la página de inicio
  { path: "characters/page/:pg", component:SectionComponent}, // Ruta para la sección de personajes
  { path: "events/page/:pg", component:SectionComponent}, // Ruta para la sección de eventos
  { path: "series/page/:pg", component:SectionComponent}, // Ruta para la sección de series
  { path: "comics/page/:pg", component:SectionComponent} // Ruta para la sección de comics
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
