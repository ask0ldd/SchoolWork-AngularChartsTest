import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICountryJOStats, IEventStats } from '../models/countryJOStats';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JoMockapiService {

  JODatas : Promise<ICountryJOStats[]>

  constructor(/*private http: HttpClient*/) {
    this.JODatas = this.retrieveJODatas()
  }

  async retrieveJODatas(){
    try{
      return (await fetch('../assets/olympic.json')).json()
    }catch(error){
      console.error(error)
    }
  }

  /*async getCountryMedals(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    return selectedCountryDatas?.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.medalsCount, 0)
  }*/

  async getLineChartDatas(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    return [{name: country, series: selectedCountryDatas?.participations.map(participation => ({name : participation.year.toString(), value : participation.medalsCount}))}]
  }

  async getPieDatas() : Promise<{name : string, value : number} []>{
    return (await this.JODatas).map((countryDatas : ICountryJOStats) => ({name : countryDatas.country, value : countryDatas.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.medalsCount, 0)}))
  }

  async getNumberOfJOs() : Promise<number>{
    const JODatas = await this.JODatas
    let eventsDates : number[] = []
    JODatas.forEach(countryStats => {
      countryStats.participations.forEach(participation => {
        if(!eventsDates.includes(participation.year)) eventsDates.push(participation.year)
      })
    })
    return eventsDates.length
  }

}

/*
  // countriesJOStats$ : Observable<ICountryJOStats[] | any> // $ = observable
  CJS : WritableSignal<ICountryJOStats[] | [] > = signal([])

  CJS2 : Promise<ICountryJOStats[]> | any

  // use dataresolver
  constructor(private http: HttpClient) {
    // this.countriesJOStats$ = this.http.get<ICountryJOStats[]>('../assets/olympic.json')
    this.http.get<ICountryJOStats[]>('../assets/olympic.json').subscribe(stats => this.CJS.set(stats))
    fetch('../assets/olympic.json').then(response => {this.CJS2 = response.json(); return response.json();}).then(datas => this.CJS2 = datas)
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

  async getCountryMedals2(){
      // if(typeof(this.CJS2) )
  }

}*/
