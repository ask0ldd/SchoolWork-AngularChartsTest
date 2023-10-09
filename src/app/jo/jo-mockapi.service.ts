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

  async getCountryMedals(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    return selectedCountryDatas?.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.medalsCount, 0)
  }

  async getCountryAthletes(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    return selectedCountryDatas?.participations.reduce((accumulator : number, participation : IEventStats) => accumulator + participation.athleteCount, 0)
  }

  async getLineChartDatas(country : string){
    const selectedCountryDatas = (await this.JODatas).find((datas : ICountryJOStats) => datas.country.toLowerCase() === country)
    if(selectedCountryDatas) return [{name: country, series: selectedCountryDatas.participations.map(participation => ({name : participation.year.toString(), value : participation.medalsCount}))}]
    return undefined
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
