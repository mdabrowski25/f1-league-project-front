import { Component, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-upcoming-races',
    templateUrl: './upcoming-races.component.html',
    styleUrls: ['./upcoming-races.component.css']
})
export class UpcomingRacesComponent implements OnInit {
    racesToCome: Race[] = [];
    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getArraysUpdated().subscribe(arrays => {
            this.racesToCome = arrays.racesToCome;
        });
    }

    showDate(race: Race) {
        return race.date != undefined ? race.date : 'Brak informacji'
    }
}
