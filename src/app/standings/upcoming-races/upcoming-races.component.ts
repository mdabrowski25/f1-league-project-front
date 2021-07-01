import { Component, Input, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';

@Component({
    selector: 'app-upcoming-races',
    templateUrl: './upcoming-races.component.html',
    styleUrls: ['./upcoming-races.component.css']
})
export class UpcomingRacesComponent implements OnInit {
    @Input() races: Race[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    showDate(race: Race) {
        return race.date != undefined ? race.date : 'Brak informacji'
    }
}
