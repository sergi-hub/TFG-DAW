import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './windows/home/home.component';
import { SectionComponent } from './windows/section/section.component';

const routes: Routes = [
  { path: "", component:HomeComponent},
  { path: "characters", component:SectionComponent},
  { path: "events", component:SectionComponent},
  { path: "series", component:SectionComponent},
  { path: "comics", component:SectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
