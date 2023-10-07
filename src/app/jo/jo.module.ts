import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoMockapiService } from './jo-mockapi.service';
import { CountriesMedalsPiechartComponent } from './countries-medals-piechart/countries-medals-piechart.component';
import { CountryStatsLinechartComponent } from './country-stats-linechart/country-stats-linechart.component';
import { RouterModule, Routes } from '@angular/router';

const joRoutes: Routes = [
  {path: 'medalspiechart', component: CountriesMedalsPiechartComponent},
  {path: 'countrylinechart/:id', component: CountryStatsLinechartComponent},
]

@NgModule({
  declarations: [
    CountriesMedalsPiechartComponent,
    CountryStatsLinechartComponent,
  ],
  imports: [
    RouterModule.forChild(joRoutes),
    CommonModule,    
  ],
  providers: [
    JoMockapiService
  ],
})
export class JoModule { }
