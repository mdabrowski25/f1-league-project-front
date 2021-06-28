import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  races: Race[] = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getRaces().subscribe((data) => {
      this.races = data.races;
    })
  }

}
