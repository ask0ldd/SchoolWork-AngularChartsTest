import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoMockapiService } from './jo-mockapi.service';
import { CountriesMedalsPiechartComponent } from './countries-medals-piechart/countries-medals-piechart.component';
import { CountryStatsLinechartComponent } from './country-stats-linechart/country-stats-linechart.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const joRoutes: Routes = [
  {path: '', component: CountriesMedalsPiechartComponent},
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
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [
    JoMockapiService
  ],
})
export class JoModule { }
