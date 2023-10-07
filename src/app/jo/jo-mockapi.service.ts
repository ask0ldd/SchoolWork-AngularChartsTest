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

}
