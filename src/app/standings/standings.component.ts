import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/model/race.model';
import { HttpService } from '../services/http.service';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { RacesDto } from '../shared/dto/races-dto.model';
import { RaceData } from '../shared/model/racedata.model';
import { RacerTeam } from '../shared/model/racer-team.model';
import { forkJoin, Observable } from 'rxjs';


@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
    observables: Observable<any>[] = [];
    races: Race[] = [];
    racers: Racer[] = [];
    teams: Team[] = [];

    loading: boolean = false;
    fetchErrorOccurred: boolean = false;

    constructor(private http: HttpService) {
    }

    ngOnInit(): void {
        this.observables.push(this.http.getRacers());
        this.observables.push(this.http.getTeams());
        this.observables.push(this.http.getRaces());

        this.loading = true;
        forkJoin(this.observables).subscribe(([dataRacers, dataTeams, dataRaces]) => {
            this.racers = dataRacers.racers;
            this.racers.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id == b.id) {
                    return 0;
                } else {
                    return 1;
                }
            });

            this.teams = dataTeams.teams;
            this.teams.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id == b.id) {
                    return 0;
                } else {
                    return 1;
                }
            });

            let racesFromDb: RacesDto[] = dataRaces.races;
            let racesArray: Race[] = [];

            for (let i = 0; i < racesFromDb.length; i++) {
                let raceFromDb = racesFromDb[i];
                let race = new Race(raceFromDb.id, raceFromDb.name);
                race.date = raceFromDb.date;
                let scoreboard = raceFromDb.scores;
                for (let j = 0; j < scoreboard.length; j++) {
                    let scoreboardElement = scoreboard[j];
                    let team = this.teams.find(team => team.id == scoreboardElement.racerAndTeam.team.id);
                    let racer = this.racers.find(racer => racer.id == scoreboardElement.racerAndTeam.racer.id);
                    if (racer != undefined && team != undefined && race.scores != undefined) {
                        let racerTeam = new RacerTeam(racer, team);
                        let raceData = new RaceData(scoreboardElement.position, racerTeam, scoreboardElement.bestLapTime);
                        race.scores.push(raceData)
                    }
                }
                racesArray.push(race);
            }
            this.races = racesArray;

            this.addPointsToDriversAndTeams()

            this.sortRacersAndTeamsByPoints();
            this.loading = false;
        }, () => {
            this.fetchErrorOccurred = true;
        });
    }

    private addPointsToDriversAndTeams() {
        this.addPoints('racers');
        this.addPoints('teams');
    }

    private addPoints(string: string) {
        for (let i = 0; i < this.races.length; i++) {
            let scores = this.races[i].scores;
            if (scores != undefined) {
                const pointsArray: number[] = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
                if (string === 'racers') {
                    for (let j = 0; j < scores.length; j++) {
                        let currentRaceData = scores[j];
                        let racer = this.racers.find(el => el.id == currentRaceData.racerAndTeam.racer.id);
                        if (racer != undefined) {
                            if (j < 10) {
                                this.racers[racer.id - 1].points += pointsArray[j];
                            }
                        }
                    }
                } else {
                    for (let j = 0; j < scores.length; j++) {
                        let currentRaceData = scores[j];
                        let team = this.teams.find(el => el.id == currentRaceData.racerAndTeam.team.id);
                        if (team != undefined) {
                            if (j < 10) {
                                this.teams[team.id - 1].points += pointsArray[j];
                            }
                        }
                    }
                }
            }
        }
    }

    private sortRacersAndTeamsByPoints() {
        this.racers.sort((a, b) => {
            if (a.points > b.points) {
                return -1;
            } else if (a.points === b.points) {
                return 0;
            } else {
                return 1;
            }
        });
        this.teams.sort((a, b) => {
            if (a.points > b.points) {
                return -1;
            } else if (a.points === b.points) {
                return 0;
            } else {
                return 1;
            }
        });
    }
}
