import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { UpcomingRace } from '../../shared/models/upcoming-race.model';

@Component({
    selector: 'app-upcoming-races',
    templateUrl: './upcoming-races.component.html',
    styleUrls: ['./upcoming-races.component.css']
})
export class UpcomingRacesComponent implements OnInit, OnDestroy {
    racesToCome: UpcomingRace[] = [];
    raceSub: Subscription | undefined;
    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.raceSub = this.data.getArraysUpdated().subscribe(arrays => {
            this.racesToCome = arrays.racesToCome;
        });
    }

    showDate(race: UpcomingRace) {
        return race.date != undefined ? race.date : 'Brak informacji'
    }

    ngOnDestroy(): void {
        if (this.raceSub != undefined) {
            this.raceSub.unsubscribe();
        }
    }
}
