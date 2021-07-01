import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
    races: Race[] = [
        new Race(1, 'Meksyk'),
        new Race(2, 'USA'),
        new Race(3, 'Brazylia'),
        new Race(4, 'Abu Zabi')
    ];

    constructor(private http: HttpService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        // this.http.getRaces().subscribe((data) => {
        //     this.races = data.races;
        // });
        this.races[0].date = this.datePipe.transform(new Date(2021, 7-1, 4, 20), 'dd-MM-yyyy HH:mm');
    }
}
