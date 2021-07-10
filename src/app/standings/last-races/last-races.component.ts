import { Component, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-last-races',
    templateUrl: './last-races.component.html',
    styleUrls: ['./last-races.component.css']
})
export class LastRacesComponent implements OnInit {
    races: Race[] = [];

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getArraysUpdated().subscribe(arrays => {
            this.races = arrays.races;
        });
    }

}
