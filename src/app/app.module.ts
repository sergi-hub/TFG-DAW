import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersonajesComponent } from './windows/personajes/personajes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './windows/home/home.component';
import { HeaderComponent } from './header/header.component';
import { HomeService } from 'src/services/home/home.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastSlashFilter } from 'src/pipes/lastSlashFilter.pipe';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    PersonajesComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    lastSlashFilter,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
