import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Race } from '../shared/model/race.model';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { RaceDtoGet } from '../shared/dto/race-dto-get.model';
import { RacerTeam } from '../shared/model/racer-team.model';
import { RaceData } from '../shared/model/racedata.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    observables: Observable<any>[] = [];
    races: Race[] = [];
    racers: Racer[] = [];
    teams: Team[] = [];
    upcomingRaces: Race[] = [];
    loading: boolean = false;
    fetchErrorOccurred: boolean = false;
    private arraysUpdated = new Subject<{ races: Race[], racers: Racer[], teams: Team[], racesToCome: Race[], loading: boolean, fetchErrorOccurred: boolean }>()

    constructor(private http: HttpService) {
    }

    getData() {
        this.observables.push(this.http.getRacers());
        this.observables.push(this.http.getTeams());
        this.observables.push(this.http.getRaces());
        this.observables.push(this.http.getUpcomingRaces());

        this.loading = true;
        forkJoin(this.observables).subscribe(([dataRacers, dataTeams, dataRaces, dataUpcomingRaces]) => {
            this.upcomingRaces = dataUpcomingRaces.upcomingRaces;
            this.racers = dataRacers.racers;
            this.teams = dataTeams.teams;
            this.sortRacersAndTeamsByIds();

            let racesFromDb: RaceDtoGet[] = dataRaces.races;
            let racesArray: Race[] = [];

            for (let i = 0; i < racesFromDb.length; i++) {
                let raceFromDb = racesFromDb[i];
                let race = new Race(raceFromDb.id, raceFromDb.name);
                race.date = raceFromDb.date;
                race.bestLapTime = raceFromDb.bestLapTime;
                let scoreboard = raceFromDb.scores;
                for (let j = 0; j < scoreboard.length; j++) {
                    let scoreboardElement = scoreboard[j];
                    let team = this.teams.find(team => team.id == scoreboardElement.racerAndTeam.team.id);
                    let racer = this.racers.find(racer => racer.id == scoreboardElement.racerAndTeam.racer.id);
                    if (racer != undefined && team != undefined && race.scores != undefined) {
                        let racerTeam = new RacerTeam(racer, team);
                        let raceData = new RaceData(scoreboardElement.position, racerTeam, scoreboardElement.bestLapTime);
                        race.scores.push(raceData);
                    }
                }
                racesArray.push(race);
            }
            this.races = racesArray;

            this.addPointsToDriversAndTeams();

            this.sortRacersAndTeamsByPoints();
            this.loading = false;
            this.arraysUpdated.next({
                races: [...this.races],
                racers: [...this.racers],
                teams: [...this.teams],
                racesToCome: [...this.upcomingRaces],
                loading: this.loading,
                fetchErrorOccurred: this.fetchErrorOccurred
            });
        }, () => {
            this.fetchErrorOccurred = true;
            this.arraysUpdated.next({
                races: [...this.races],
                racers: [...this.racers],
                teams: [...this.teams],
                racesToCome: [...this.upcomingRaces],
                loading: this.loading,
                fetchErrorOccurred: this.fetchErrorOccurred
            });
        });
    }

    getArraysUpdated() {
        return this.arraysUpdated.asObservable();
    }

    private sortRacersAndTeamsByIds() {
        this.racers.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id == b.id) {
                return 0;
            } else {
                return 1;
            }
        });
        this.teams.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id == b.id) {
                return 0;
            } else {
                return 1;
            }
        });
    }

    private addPointsToDriversAndTeams() {
        this.addPoints('racers');
        this.addPoints('teams');
    }

    private addPoints(string: string) {
        for (let i = 0; i < this.races.length; i++) {
            let bestLapTime: number[] = [1000, 1000, 1000];
            let racerWithBestLapTime: Racer = new Racer(0, '');
            let teamWithBestLapTime: Team = new Team(0, '');

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
                        if (currentRaceData.bestLapTime[0] < bestLapTime[0]) {
                            bestLapTime = currentRaceData.bestLapTime;
                            racerWithBestLapTime = currentRaceData.racerAndTeam.racer
                            teamWithBestLapTime = currentRaceData.racerAndTeam.team
                        } else if (currentRaceData.bestLapTime[0] == bestLapTime[0]) {
                            if (currentRaceData.bestLapTime[1] < bestLapTime[1]) {
                                bestLapTime = currentRaceData.bestLapTime;
                                racerWithBestLapTime = currentRaceData.racerAndTeam.racer
                                teamWithBestLapTime = currentRaceData.racerAndTeam.team
                            } else if (currentRaceData.bestLapTime[1] == bestLapTime[1]) {
                                if (currentRaceData.bestLapTime[2] < bestLapTime[2]) {
                                    bestLapTime = currentRaceData.bestLapTime;
                                    racerWithBestLapTime = currentRaceData.racerAndTeam.racer
                                    teamWithBestLapTime = currentRaceData.racerAndTeam.team
                                }
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
                this.addBestLapAndPoint(i, racerWithBestLapTime, bestLapTime, teamWithBestLapTime);
            }
        }
    }

    private addBestLapAndPoint(i: number, racerWithBestLapTime: Racer, bestLapTime: number[], teamWithBestLapTime: Team) {
        let racerTemp = this.racers.find(el => el.id == racerWithBestLapTime.id);
        let teamTemp = this.teams.find(el => el.id == teamWithBestLapTime.id);
        if (racerTemp != undefined && teamTemp != undefined) {
            this.racers[racerTemp.id - 1].points++;
            this.races[i].bestLapTime = bestLapTime;
            this.teams[teamTemp.id - 1].points++;
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
