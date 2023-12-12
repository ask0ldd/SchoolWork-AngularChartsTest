import { Injectable, WritableSignal, signal } from '@angular/core';
import { ICountryJOStats, IEventStats } from '../models/countryJOStats';
import { Observable, of, reduce, find, map, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JoMockapiService {

  JODatas : Promise<ICountryJOStats[]>
  datasUrl = '../assets/olympic.json'

  constructor(private _http: HttpClient) {
    this.JODatas = this.retrieveJODatas()
  }

  // Obs

  retrieveJODatas$(): Observable<ICountryJOStats[]>{
    return this._http.get<ICountryJOStats[]>(this.datasUrl).pipe( // catch error?
      catchError((error, caught) => {
        console.error(error);
        return caught;
      })
    )
  }

  // using find - rxjs operator - would allow me to ignore emissions not matching my condition, 
  // reduce - rxjs operator - would allow me to work on successive emissions
  // it wouldn't allow me to find the first ICountryJOStats matching it
  getCountryMedals$(country : string) : Observable<number>{
    return this.retrieveJODatas$().pipe( // !!! catch error
        map((datas : ICountryJOStats[]) => datas
        .find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)?.participations
        .reduce((accumulator : number, participation : IEventStats) => accumulator + participation.medalsCount, 0) || 0
        )
    )
  }

  getCountryTotalAthletes$(country : string) : Observable<number>{
    return this.retrieveJODatas$().pipe(
        map((datas : ICountryJOStats[]) => datas
        .find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)?.participations
        .reduce((accumulator : number, participation : IEventStats) => accumulator + participation.athleteCount, 0) || 0
        )
    )
  }

  // Non Obs

  async retrieveJODatas(){
    try{
      return (await fetch(this.datasUrl)).json()
    }catch(error){
      console.error(error)
    }
  }

  async getCountryMedalsFor(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    return selectedCountryDatas?.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.medalsCount, 0)
  }

  async getTotalAthletesFor(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    if(selectedCountryDatas) return selectedCountryDatas?.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.athleteCount, 0)
    return null
  }

  async getLineChartDatasFor(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    if(selectedCountryDatas) return [{name: country, series: selectedCountryDatas.participations.map(participation => ({name : participation.year.toString(), value : participation.medalsCount}))}]
    return null
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
