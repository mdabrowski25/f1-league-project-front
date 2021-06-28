import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { Race } from '../shared/model/race.model';
import { RacesDto } from '../shared/dto/races-dto.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    POST_URL = 'http://localhost:3000';
    GET_URL = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {
    }

    postRacer(racer: Racer) {
        this.httpClient.post<Racer>(this.POST_URL + '/post/racer', racer).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postTeam(team: Team) {
        this.httpClient.post<Team>(this.POST_URL + '/post/team', team).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postRace(race: Race) {
        this.httpClient.post<Race>(this.POST_URL + '/post/race', race).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    getRacers() {
        return this.httpClient.get<Racer[]>(this.GET_URL + '/get/racers');
    }

    getTeams() {
        return this.httpClient.get<Team[]>(this.GET_URL + '/get/teams');
    }

    getRaces() {
        return this.httpClient.get<RacesDto>(this.GET_URL + '/get/races');
    }


}
