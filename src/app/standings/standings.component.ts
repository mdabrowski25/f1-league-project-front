import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';


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
    racers: Racer[] = [];
    teams: Team[] = [];

    constructor(private http: HttpService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.http.getRacers().subscribe((data) => {
            this.racers = data.racers;
        });

        this.http.getTeams().subscribe(data => {
            this.teams = data.teams;
        });

        //TO DO
        // this.http.getRaces().subscribe((data) => {
        //
        // });

        this.races[0].date = this.datePipe.transform(new Date(2021, 7 - 1, 4, 20), 'dd-MM-yyyy HH:mm');
    }

    private sortRacersByPoints() {
        this.racers.sort((a, b) => {
            if (a.points > b.points) {
                return 1;
            } else if (a.points === b.points) {
                return 0;
            } else {
                return -1;
            }
        });
    }

    private returnTeamFromString(teamName: string) {
        switch (teamName) {
            case 'ferrari':
                return this.teams.find(team => team.id === 3);
            case 'redbull':
                return this.teams.find(team => team.id === 1);
            case 'renault':
                return this.teams.find(team => team.id === 2);
            case 'mercedes':
                return this.teams.find(team => team.id === 4);
            case 'mclaren':
                return this.teams.find(team => team.id === 5);
            default:
                return;
        }

    };
}
