import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './windows/home/home.component';
import { HeaderComponent } from './header/header.component';
import { HomeService } from 'src/services/home/home.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastSlashFilter } from 'src/pipes/lastSlashFilter.pipe';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { SectionService } from 'src/services/section/section.service';
import { SectionComponent } from './windows/section/section.component';
import { NullOrEmptyPipe } from 'src/pipes/nullOrEmpty';
import { PaginacionComponent } from './paginacion/paginacion.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    lastSlashFilter,
    NullOrEmptyPipe,
    FooterComponent,
    SectionComponent,
    PaginacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HomeService,
    SectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
