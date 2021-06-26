import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { Race } from '../shared/model/race.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    POST_URL = '';
    GET_URL = '';

    constructor(private httpClient: HttpClient) {
    }

    postRacer(racer: Racer) {
        this.httpClient.post<Racer>(this.POST_URL + '#', racer).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postTeam(team: Team) {
        this.httpClient.post<Team>(this.POST_URL + '#', team).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postRace(race: Race) {
        this.httpClient.post<Race>(this.POST_URL + '#', race).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    getRacers() {
        return this.httpClient.get<Racer[]>(this.GET_URL + '#');
    }

    getTeams() {
        return this.httpClient.get<Team[]>(this.GET_URL + '#');
    }

    getRaces() {
        return this.httpClient.get<Race[]>(this.GET_URL + '#');
    }


}
