import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DigimonsService } from './digimons.service';
import { DigimonsComponent } from './digimons/digimons.component';
import { HttpClientModule } from '@angular/common/http';
import { AxiosService } from './axios.service';

@NgModule({
  declarations: [
    AppComponent,
    DigimonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DigimonsService,
    AxiosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
