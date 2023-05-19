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
import { SectionComponent } from './windows/section/section.component';
import { NullOrEmptyPipe } from 'src/pipes/nullOrEmpty';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { ItemDetailComponent } from './windows/item-detail/item-detail.component';
import { ActualPagePipe } from 'src/pipes/actual-page.pipe';
import { SharedService } from 'src/services/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteService } from 'src/services/route.service';
import { LoginComponent } from './windows/login/login.component';
import { CountriesService } from 'src/services/countries.service';
import { UsersService } from 'src/services/users.service';
import { ArticlesService } from 'src/services/articles.service';
import { ProfileComponent } from './windows/profile/profile.component';
import { ChargingScreenComponent } from './charging-screen/charging-screen.component';



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
    PaginacionComponent,
    ItemDetailComponent,
    ActualPagePipe,
    LoginComponent,
    ProfileComponent,
    ChargingScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService,
    SharedService,
    RouteService,
    CountriesService,
    UsersService,
    ArticlesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
