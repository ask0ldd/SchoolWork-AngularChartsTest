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
  
  constructor(private router:Router, private route: ActivatedRoute, private joService : JoMockapiService){ }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get('id')
    if(this.countryName == null) {
      this.router.navigateByUrl('/404') 
      return
    }
  }
}
