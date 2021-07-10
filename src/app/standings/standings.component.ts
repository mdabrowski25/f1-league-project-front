import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
    races: Race[] = [];
    racers: Racer[] = [];
    teams: Team[] = [];

    loading: boolean = false;
    fetchErrorOccurred: boolean = false;

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getData();
        this.data.getArraysUpdated().subscribe(arrays => {
            this.races = arrays.races;
            this.racers = arrays.racers;
            this.teams = arrays.teams;
            this.loading = arrays.loading;
            this.fetchErrorOccurred = arrays.fetchErrorOccurred;
        });
    }


}
