import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { RaceDtoGet } from '../shared/dto/race-dto-get.model';
import { UpcomingRaceDto } from '../shared/dto/upcoming-race-dto.model';
import { Router } from '@angular/router';
import { RacerDto } from '../shared/dto/racer-dto.model';
import { TeamDto } from '../shared/dto/team-dto.model';
import { RaceDtoPost } from '../shared/dto/race-dto-post.model';
import { UpcomingRace } from '../shared/model/upcomingrace-model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    POST_URL = environment.apiUrl + '/post';
    GET_URL = environment.apiUrl + '/get';
    PUT_URL = environment.apiUrl + '/put';

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    postRacer(racer: RacerDto) {
        this.httpClient.post<RacerDto>(this.POST_URL + '/racer', racer).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Kierowca dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postTeam(team: TeamDto) {
        this.httpClient.post<TeamDto>(this.POST_URL + '/team', team).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Drużyna dodana'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postRace(race: RaceDtoPost) {
        this.httpClient.post<RaceDtoPost>(this.POST_URL + '/race', race).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Wyścig z wynikami dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postUpcomingRace(upcomingRace: UpcomingRaceDto) {
        this.httpClient.post<UpcomingRaceDto>(this.POST_URL + '/upcoming-race', upcomingRace).subscribe(() => {
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
            races: [racesDto: RaceDtoGet]
        }>(this.GET_URL + '/races');
    }

    getUpcomingRaces() {
        return this.httpClient.get(this.GET_URL + '/upcoming-races');
    }

    getRacer(id: number) {
        return this.httpClient.get(this.GET_URL + '/racer' + id);
    }

    putUpcomingRace(upcomingRace: UpcomingRace) {
        this.httpClient.put(this.PUT_URL + '/upcoming-race/' + upcomingRace.id, upcomingRace).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Wyscig edytowany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }


}
