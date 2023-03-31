import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './windows/home/home.component';
import { PersonajesComponent } from './windows/personajes/personajes.component';

const routes: Routes = [
  { path: "", component:HomeComponent},
  { path: "personajes", component:PersonajesComponent}/*,
  { path: "", component:},
  {path: "", component:}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
