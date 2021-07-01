import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Racer } from '../shared/model/racer.model';
import { RacesDto } from '../shared/dto/races-dto.model';
import { RacerTeamDto } from '../shared/dto/racer-team-dto.model';
import { Team } from '../shared/model/team.model';
import { RaceData } from '../shared/model/racedata.model';

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

        this.http.getRaces().subscribe((data) => {
            let racesDto: RacesDto[] = data.races;
            let racesArray: Race[] = [];
            let racersTeamsDto: RacerTeamDto[] = [];

            racesDto.forEach(el => {
                let race = new Race(el.id, el.name)
                race.date = el.date;
                let standings = el.scores.standings;
                let standingsMap = new Map<number, Racer>();

                for (let [key, value] of standings) {
                    let strings = value.split(',');
                    let racerById = this.racers.find(el => el.id === +strings[0]);
                    let teamToReturn = this.returnTeamFromString(strings[1]);
                    if (racerById != undefined && teamToReturn != undefined) {
                        standingsMap.set(+key, racerById);
                        let racerTeamDtoToPush = new RacerTeamDto(racerById, teamToReturn);
                        racersTeamsDto.push(racerTeamDtoToPush);
                    }
                }

                let racerAndBestLapTime = el.bestLapTime.split(',');
                let racerWithBestLapTime = this.racers.find(racer => racer.id === +racerAndBestLapTime[0]);
                if (racerWithBestLapTime != undefined) {
                    racerWithBestLapTime.points++;
                }

                race.scores = new RaceData(standingsMap, racersTeamsDto, racerAndBestLapTime[1]);

                racesArray.push(race);
            });

            this.races = racesArray;

            this.addPointsToRacers();

            this.sortRacersByPoints();
        });
        this.races[0].date = this.datePipe.transform(new Date(2021, 7 - 1, 4, 20), 'dd-MM-yyyy HH:mm');
    }

    private addPointsToRacers() {
        // TO DO
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
