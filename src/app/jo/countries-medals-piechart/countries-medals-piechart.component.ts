import { Component, OnInit, WritableSignal } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { ICountryJOStats } from 'src/app/models/countryJOStats';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-countries-medals-piechart',
  templateUrl: './countries-medals-piechart.component.html',
  styleUrls: ['./countries-medals-piechart.component.css']
})
export class CountriesMedalsPiechartComponent implements OnInit {

  // datas : WritableSignal<ICountryJOStats[] | null>
  processedValue : any
  pieDatas : {name : string, value : number} [] | undefined

  constructor(private JOService : JoMockapiService){ 
    // this.datas = this.JOService.CJS
  }

  async ngOnInit(): Promise<any> {

    /*console.log(JSON.stringify(this.JOService.CJS()))

    this.JOService.getCountryMedals('france').subscribe(medals => console.log('medals',medals))
    this.JOService.getCountryMedals2()*/

    console.log (await this.JOService.getCountryMedals("france"))
    this.processedValue = await this.JOService.getCountryMedals("france")
    this.pieDatas = await this.JOService.pieDatas()
  }

}
