import { Component, OnInit } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-stats-linechart',
  templateUrl: './country-stats-linechart.component.html',
  styleUrls: ['./country-stats-linechart.component.css']
})
export class CountryStatsLinechartComponent implements OnInit {

  countryName : string | null
  linechartDatas : { name: string, series: { name: string, value: number }[] }[] | undefined
  YticksList : number[] = [0, 10 , 20, 30, 40]
  maxMedals : number
  
  constructor(private router:Router, private route: ActivatedRoute, private joService : JoMockapiService){ }

  async ngOnInit(): Promise<void> {
    this.countryName = this.route.snapshot.paramMap.get('id')
    if(this.countryName == null) {
      this.router.navigateByUrl('/404') 
      return
    }

    this.linechartDatas = await this.joService.getLineChartDatas(this.countryName)
    /*this.linechartDatas.map(
      (performance : any) => performance.name  // needs to be improved
    )*/
    if(this.linechartDatas){
      const medalsList = this.linechartDatas[0].series?.map(serie => serie.value)
      this.maxMedals = Math.max(...medalsList)
    }
  }
}
