import { Component, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-upcoming-races',
    templateUrl: './upcoming-races.component.html',
    styleUrls: ['./upcoming-races.component.css']
})
export class UpcomingRacesComponent implements OnInit {
    racesToCome: Race[] = [
        new Race(1, 'Meksyk'),
        new Race(2, 'USA'),
        new Race(3, 'Brazylia'),
        new Race(4, 'Abu Zabi')
    ];
    constructor(private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.racesToCome[0].date = this.datePipe.transform(new Date(2021, 7 - 1, 4, 20), 'dd-MM-yyyy HH:mm');
    }

    showDate(race: Race) {
        return race.date != undefined ? race.date : 'Brak informacji'
    }
}
