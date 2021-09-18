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
            this.upcomingRaces = dataUpcomingRaces.upcomingRaces;
            this.racers = dataRacers.racers;
            this.teams = dataTeams.teams;
            this.races = dataRaces.races;

            //sumPoints()

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
