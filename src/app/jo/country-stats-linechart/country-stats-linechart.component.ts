import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-stats-linechart',
  templateUrl: './country-stats-linechart.component.html',
  styleUrls: ['./country-stats-linechart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountryStatsLinechartComponent implements OnInit {

  countryName : string | null
  linechartDatas : { name: string, series: { name: string, value: number }[] }[] | undefined
  YticksList : number[] = []/* = [0, 5 , 10, 15, 20]*/
  maxMedals : number
  totalMedals : number
  totalAthletes : number | undefined
  minYaxis : number
  maxYaxis : number
  view : [number, number] = [800, 400]
  
  constructor(private router:Router, private route: ActivatedRoute, private joService : JoMockapiService){ }

  async ngOnInit(): Promise<void> {
    this.countryName = this.route.snapshot.paramMap.get('id')
    if(this.countryName == null) {
      this.router.navigateByUrl('/404') 
      return
    }

    this.linechartDatas = await this.joService.getLineChartDatasFor(this.countryName)
    /*this.linechartDatas.map(
      (performance : any) => performance.name  // needs to be improved
    )*/
    /*if(this.linechartDatas){
      const medalsList = this.linechartDatas[0].series?.map(serie => serie.value)
      this.maxMedals = Math.max(...medalsList)
      if(this.maxMedals > 25) this.YticksList = [0, 10, 20, 30, 40]
      if(this.maxMedals > 50) this.YticksList = [0, 20, 40, 60, 80, 100, 120]
      // this.totalMedals = this.linechartDatas[0].series.reduce((acc, serie) => acc + serie.value, 0)
    }*/

    this.totalAthletes = await this.joService.getTotalAthletesFor(this.countryName)

    if(this.linechartDatas){
      const medalsList = this.linechartDatas[0].series?.map(serie => serie.value)
      this.minYaxis = Math.floor((Math.min(...medalsList) / 10)) * 10
      if(this.minYaxis < 0) this.minYaxis = 0
      this.maxYaxis = Math.ceil((Math.max(...medalsList) / 10)) * 10

      this.totalMedals = this.linechartDatas[0].series.reduce((acc, serie) => acc + serie.value, 0)

      // if maxY-minY <= 20 then ticks are space by 5
      // if > 20 then spaced by 10
      let space = 10
      if(this.maxYaxis-this.minYaxis <= 20) space = 5
      if(this.maxYaxis-this.minYaxis <= 10) space = 2
      let currentTick = this.minYaxis
      while(currentTick<=this.maxYaxis){
        this.YticksList.push(currentTick)
        currentTick += space
      }
      console.log(this.YticksList)
    }
  }

  onResize(event : UIEvent) { // show not only take into account resize but initialsize too
    const windowWidth = (event.target as Window).innerWidth
    if(windowWidth <= 420) return this.view = [300, 300]
    if(windowWidth <= 600) return this.view = [400, 300]
    if(windowWidth <= 1200) return this.view = [600, 400]
    return this.view = [800, 400]
  }

}
