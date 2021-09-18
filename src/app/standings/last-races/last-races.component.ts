import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Race } from '../../shared/models/race.model';

@Component({
    selector: 'app-last-races',
    templateUrl: './last-races.component.html',
    styleUrls: ['./last-races.component.css']
})
export class LastRacesComponent implements OnInit, OnDestroy {
    races: Race[] = [];
    raceSub: Subscription | undefined;

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.raceSub = this.data.getArraysUpdated().subscribe(arrays => {
            this.races = arrays.races;
        });
    }

    ngOnDestroy(): void {
        if (this.raceSub != undefined) {
            this.raceSub.unsubscribe();
        }
    }

}
