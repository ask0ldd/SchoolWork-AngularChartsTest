import { Component, OnInit } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';

@Component({
  selector: 'app-country-stats-linechart',
  templateUrl: './country-stats-linechart.component.html',
  styleUrls: ['./country-stats-linechart.component.css']
})
export class CountryStatsLinechartComponent implements OnInit {
  
  constructor(private joService : JoMockapiService){ }
  
  ngOnInit(): void {
    
  }
}
