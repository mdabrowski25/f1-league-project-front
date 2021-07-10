import { Component, OnDestroy, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-upcoming-races',
    templateUrl: './upcoming-races.component.html',
    styleUrls: ['./upcoming-races.component.css']
})
export class UpcomingRacesComponent implements OnInit, OnDestroy {
    racesToCome: Race[] = [];
    raceSub: Subscription | undefined;
    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.raceSub = this.data.getArraysUpdated().subscribe(arrays => {
            this.racesToCome = arrays.racesToCome;
        });
    }

    showDate(race: Race) {
        return race.date != undefined ? race.date : 'Brak informacji'
    }

    ngOnDestroy(): void {
        if (this.raceSub != undefined) {
            this.raceSub.unsubscribe();
        }
    }
}
