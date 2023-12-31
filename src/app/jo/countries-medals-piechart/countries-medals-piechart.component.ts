import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { Observable } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-countries-medals-piechart',
  templateUrl: './countries-medals-piechart.component.html',
  styleUrls: ['./countries-medals-piechart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesMedalsPiechartComponent implements OnInit {

  // @ViewChild('customTooltip', { static: true }) customTooltip: TemplateRef<any>
  // processedValue : any

  pieDatas : {name : string, value : number} []
  numberOfJOs : number
  pieDatas$ : Observable<{name : string, value : number} []>
  numberOfJOs$: Observable<number>;

  colorScheme : Color = {
    domain:['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1'],
    group: ScaleType.Linear,
    selectable: true,
    name: 'Pie Scheme',
  }

  constructor(private JOService : JoMockapiService, private router : Router, private route : ActivatedRoute,){ }

  async ngOnInit(): Promise<void> {
    this.pieDatas$ = this.JOService.getPieChartDatas$()
    this.numberOfJOs$ = this.JOService.getNumberOfJOs$()
  }

  setLabelFormatting(label : string): string {
    return `${label}`
  }

  onSelect(event : EventEmitter<any>){
    // event obj : {name: 'Italy', value: 96, label: 'Italy'}
    if(event.name != null) {
      this.router.navigateByUrl(`countrylinechart/${event.name.toLowerCase()}`) 
      return
    }
  }

}
