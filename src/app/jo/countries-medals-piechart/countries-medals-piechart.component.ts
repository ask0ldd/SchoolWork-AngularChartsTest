import { Component, EventEmitter, OnInit, TemplateRef, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';
import { ICountryJOStats } from 'src/app/models/countryJOStats';
import { Observable, of } from 'rxjs';
import { Color, ScaleType, TooltipContentComponent } from '@swimlane/ngx-charts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-countries-medals-piechart',
  templateUrl: './countries-medals-piechart.component.html',
  styleUrls: ['./countries-medals-piechart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesMedalsPiechartComponent implements OnInit {

  // @ViewChild('customTooltip', { static: true }) customTooltip: TemplateRef<any>

  // datas : WritableSignal<ICountryJOStats[] | null>
  processedValue : any
  pieDatas : {name : string, value : number} []
  numberOfJOs : number

  colorScheme : Color = {
    domain:['#956065', '#793d52', '#89a1db', '#9780a1', '#bfe0f1'],
    group: ScaleType.Linear,
    selectable: true,
    name: 'Pie Scheme',
  }

  constructor(private JOService : JoMockapiService, private router : Router, private route : ActivatedRoute,){ }

  async ngOnInit(): Promise<void> {
    this.pieDatas = await this.JOService.getPieDatas()
    this.numberOfJOs = await this.JOService.getNumberOfJOs()
  }

  setLabelFormatting(label : string): string {
    return `${label}`
  }

  onSelect(event : EventEmitter<any>){
    // event obj : {name: 'Italy', value: 96, label: 'Italy'}
    // console.log(event)
    if(event.name != null) {
      this.router.navigateByUrl(`countrylinechart/${event.name.toLowerCase()}`) 
      return
    }
  }

}
