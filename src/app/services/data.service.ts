import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Racer } from '../shared/models/racer.model';
import { Race } from '../shared/models/race.model';
import { Team } from '../shared/models/team.model';
import { UpcomingRace } from '../shared/models/upcoming-race.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    observables: Observable<any>[] = [];
    races: Race[] = [];
    racers: Racer[] = [];
    teams: Team[] = [];
    upcomingRaces: UpcomingRace[] = [];
    loading: boolean = false;
    fetchErrorOccurred: boolean = false;
    private arraysUpdated = new Subject<{ races: Race[], racers: Racer[], teams: Team[], racesToCome: UpcomingRace[], loading: boolean, fetchErrorOccurred: boolean }>()

    constructor(private http: HttpService) {
    }

    getData() {
        this.observables.push(this.http.getRacers());
        this.observables.push(this.http.getTeams());
        this.observables.push(this.http.getRaces());
        this.observables.push(this.http.getUpcomingRaces());

        this.loading = true;
        forkJoin(this.observables).subscribe(([dataRacers, dataTeams, dataRaces, dataUpcomingRaces]) => {
            this.upcomingRaces = dataUpcomingRaces
            this.racers = dataRacers
            this.teams = dataTeams
            this.races = dataRaces


            // get best lap time and save it in every race
            for (let i = 0; i < this.races.length; i++) {
                let bestLapTime = [100,100,100];
                let teamWithBestLapTime: {id: string, name: string | undefined, points: number};
                let racerWithBestLapTime: {id: string, name: string | undefined, points: number};

                for (let j = 0; j < this.races[i].scores.length; j++) {
                    let racerBest = this.races[i].scores[j].bestLapTime;
                    let racerObj = this.races[i].scores[j].racerAndTeam.racer;
                    let teamObj = this.races[i].scores[j].racerAndTeam.team;

                    //region Best lap if check
                    if (racerBest[0] < bestLapTime[0]) {
                        bestLapTime = racerBest;
                        racerWithBestLapTime = racerObj;
                        teamWithBestLapTime = teamObj;
                    } else if (racerBest[0] === bestLapTime[0]) {
                        if (racerBest[1] < bestLapTime[1]) {
                            bestLapTime = racerBest;
                            racerWithBestLapTime = racerObj;
                            teamWithBestLapTime = teamObj;
                        } else if (racerBest[1] === bestLapTime[1]) {
                            if (racerBest[2] < bestLapTime[2]) {
                                bestLapTime = racerBest;
                                racerWithBestLapTime = racerObj;
                                teamWithBestLapTime = teamObj;
                            }
                        }
                    }
                    //endregion

                    //region Add position points to drivers and teams
                    let indexOfCurrentRacer = this.racers.findIndex(racer => racer.id === racerObj.id);
                    if (indexOfCurrentRacer != -1) {
                        this.racers[indexOfCurrentRacer].points += racerObj.points;
                    }

                    let indexOfCurrentTeam = this.teams.findIndex(team => team.id === teamObj.id);
                    if (indexOfCurrentTeam != -1) {
                        this.teams[indexOfCurrentTeam].points += teamObj.points;
                    }
                    //endregion
                }

                //region Setting best lap time for every race and add points for best lap
                this.races[i].bestLapTime = bestLapTime;
                let indexOfRacerWithBestLapTime = this.racers.findIndex(racer => racer.id === racerWithBestLapTime.id);
                if (indexOfRacerWithBestLapTime != -1) {
                    this.racers[indexOfRacerWithBestLapTime].points += 1;
                }
                let indexOfTeamWithBestLapTime = this.teams.findIndex(team => team.id === teamWithBestLapTime.id);
                if (indexOfTeamWithBestLapTime != -1) {
                    this.teams[indexOfTeamWithBestLapTime].points += 1;
                }
                //endregion
            }

            this.sortRacersAndTeamsByPoints()

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
