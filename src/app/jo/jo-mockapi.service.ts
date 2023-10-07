import { Injectable } from '@angular/core';
import { ICountryJOStats } from '../models/countryJOStats';

@Injectable({
  providedIn: 'root'
})
export class JoMockapiService {

  countriesJOStats : ICountryJOStats[] | any

  constructor() {
    fetch('../assets/olympic.json').then(reponse => reponse.json).then(datas => { 
      this.countriesJOStats = datas
      console.log(this.countriesJOStats)
    }).catch(error => console.error(error))
  }

  getCountryMedals(country : string) : number{
    const JOStats = [...this.countriesJOStats] as ICountryJOStats[]
    const targetCountryJOStats = JOStats.filter(stat => {
      if(stat.country.toLowerCase() === country) return true
      return false
    })
    let medals = 0
    targetCountryJOStats[0].participations.forEach(participation => {
      medals += participation.medalsCount | 0
    })
    return medals
  }

}
