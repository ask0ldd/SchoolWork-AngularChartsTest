import { Component } from '@angular/core';
import { JoMockapiService } from '../jo-mockapi.service';

@Component({
  selector: 'app-countries-medals-piechart',
  templateUrl: './countries-medals-piechart.component.html',
  styleUrls: ['./countries-medals-piechart.component.css']
})
export class CountriesMedalsPiechartComponent implements OnInit{

  constructor(private joService : JoMockapiService){ }

  ngOnInit(): void {
    
  }

}
