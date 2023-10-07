import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICountryJOStats } from '../models/countryJOStats';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JoMockapiService {

  // countriesJOStats$ : Observable<ICountryJOStats[] | any> // $ = observable
  CJS : WritableSignal<ICountryJOStats[] | [] > = signal([])


  // use dataresolver
  constructor(private http: HttpClient) {
    // this.countriesJOStats$ = this.http.get<ICountryJOStats[]>('../assets/olympic.json')
    this.http.get<ICountryJOStats[]>('../assets/olympic.json').subscribe(stats => this.CJS.set(stats))
  }

  getCountryMedals(country : string) : Observable<number | undefined>{
    if(this.CJS().length > 0 ) {
      const countryStats = this.CJS().find(stat => stat.country === country)
      return of(countryStats?.participations.reduce((accumulator : number, participation : any) => accumulator + participation.medalsCount, 0))
    }
    let medals
    this.http.get<ICountryJOStats[]>('../assets/olympic.json').subscribe(stats => {
      const countryStats = stats.find(stat => stat.country.toLowerCase() === country)
      medals = countryStats?.participations.reduce((accumulator : number, participation : any) => accumulator + participation.medalsCount, 0)
      console.log(medals)
    })

    return of(medals)
  }

}
