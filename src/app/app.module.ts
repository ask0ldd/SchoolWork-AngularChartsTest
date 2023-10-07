import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesMedalsPiechartComponent } from './jo/countries-medals-piechart/countries-medals-piechart.component';
import { CountryStatsLinechartComponent } from './jo/country-stats-linechart/country-stats-linechart.component';
import { JoModule } from './jo/jo.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    JoModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
