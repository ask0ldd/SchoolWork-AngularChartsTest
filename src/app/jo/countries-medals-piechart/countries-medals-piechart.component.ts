import { Component, OnInit, WritableSignal } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { ICountryJOStats } from 'src/app/models/countryJOStats';

@Component({
  selector: 'app-countries-medals-piechart',
  templateUrl: './countries-medals-piechart.component.html',
  styleUrls: ['./countries-medals-piechart.component.css']
})
export class CountriesMedalsPiechartComponent implements OnInit {

  datas : WritableSignal<ICountryJOStats[] | null>

  constructor(private JOService : JoMockapiService){ 
    this.datas = this.JOService.CJS
  }

  ngOnInit(): void {

    console.log(JSON.stringify(this.JOService.CJS()))

    this.JOService.getCountryMedals('france').subscribe(medals => console.log('medals',medals))
  }

}
