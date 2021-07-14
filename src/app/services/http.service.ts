import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { Race } from '../shared/model/race.model';
import { RacesDto } from '../shared/dto/races-dto.model';
import { UpcomingRaceDto } from '../shared/dto/upcoming-race-dto.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    POST_URL = 'http://localhost:3000/api/post';
    GET_URL = 'http://localhost:3000/api/get';

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    postRacer(racer: Racer) {
        this.httpClient.post<Racer>(this.POST_URL + '/racer', racer).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postTeam(team: Team) {
        this.httpClient.post<Team>(this.POST_URL + '/team', team).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postRace(race: Race) {
        this.httpClient.post<Race>(this.POST_URL + '/race', race).subscribe(() => {
            console.log('post successful');
        }, (err) => {
            console.error(err);
        })
    }

    postUpcomingRace(upcomingRace: UpcomingRaceDto) {
        return this.httpClient.post<UpcomingRaceDto>(this.POST_URL + '/upcoming-race', upcomingRace).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Nadchodzący wyścig dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    getRacers() {
        return this.httpClient.get<{ racers: Racer[] }>(this.GET_URL + '/racers');
    }

    getTeams() {
        return this.httpClient.get<{ teams: Team[] }>(this.GET_URL + '/teams');
    }

    getRaces() {
        return this.httpClient.get<{
            races: [racesDto: RacesDto]
        }>(this.GET_URL + '/races');
    }

    getUpcomingRaces() {
        return this.httpClient.get(this.GET_URL + '/upcoming-races');
    }

    getRacer(id: number) {
        return this.httpClient.get(this.GET_URL + '/racer' + id);
    }


}
