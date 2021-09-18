import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    POST_URL = environment.apiUrl + '/post';
    GET_URL = environment.apiUrl + '/get';
    PUT_URL = environment.apiUrl + '/put';

    pointsArray: number[] = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    postRacer(racer: {
        name: string
    }) {
        this.httpClient.post<{ name: string }>(this.POST_URL + '/racer', racer).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Kierowca dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postTeam(team: { name: string }) {
        this.httpClient.post<{ name: string }>(this.POST_URL + '/team', team).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Drużyna dodana'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postRace(race: {
        name: string,
        date: string,
        scores: [{
            position: number,
            racerAndTeam: {
                racer: {
                    id: string,
                    name: string | undefined
                },
                team: {
                    id: string,
                    name: string | undefined
                }
            }
            bestLapTime: number[]
        }]
    }) {
        this.httpClient.post<{
            name: string,
            date: string,
            scores: [{
                position: number,
                racerAndTeam: {
                    racer: {
                        id: string,
                        name: string | undefined
                    },
                    team: {
                        id: string,
                        name: string | undefined
                    }
                }
                bestLapTime: number[]
            }]
        }>(this.POST_URL + '/race', race).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Wyścig z wynikami dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    postUpcomingRace(upcomingRace: { name: string, date: string }) {
        this.httpClient.post<{ name: string, date: string }>(this.POST_URL + '/upcoming-race', upcomingRace).subscribe(() => {
            this.router.navigate(['/']).then(() => alert('Nadchodzący wyścig dodany'));
        }, () => {
            this.router.navigate(['/']).then(() => alert('Wystąpił błąd'));
        });
    }

    getRacers() {
        return this.httpClient.get<{ racers: [{ _id: string, name: string }] }>(this.GET_URL + '/racers').pipe(map(
            racerData => {
                return racerData.racers.map((racer) => {
                    return {
                        id: racer._id,
                        name: racer.name,
                        points: 0
                    }
                })
            }
        ));
    }

    getTeams() {
        return this.httpClient.get<{ teams: [{ _id: string, name: string }] }>(this.GET_URL + '/teams').pipe(map(
            teamsData => {
                return teamsData.teams.map(team => {
                    return {
                        id: team._id,
                        name: team.name,
                        points: 0
                    }
                })
            }
        ));
    }

    getRaces() {
        return this.httpClient.get<{
            races: [race: {
                _id: string,
                name: string,
                date: string,
                scores: [{
                    position: number,
                    racerAndTeam: {
                        racer: {
                            id: string,
                            name: string
                        },
                        team: {
                            id: string,
                            name: string
                        }
                    }
                    bestLapTime: number[]
                }]
            }]
        }>(this.GET_URL + '/races').pipe(map(
            racesData => {
                return racesData.races.map(race => {
                    return {
                        id: race._id,
                        name: race.name,
                        date: race.date,
                        scores: race.scores.map(score => {
                            return {
                                position: score.position,
                                racerAndTeam: {
                                    racer: {
                                        id: score.racerAndTeam.racer.id,
                                        name: score.racerAndTeam.racer.name,
                                        points: this.pointsArray[score.position]
                                    },
                                    team: {
                                        id: score.racerAndTeam.racer.id,
                                        name: score.racerAndTeam.racer.name,
                                        points: this.pointsArray[score.position]
                                    }
                                },
                                bestLapTime: score.bestLapTime
                            }
                        }),
                        bestLapTime: [100,100,100]
                    }
                })
            }
        ));
    }

    getUpcomingRaces() {
        return this.httpClient.get<{ upcomingRaces: [{ _id: string, name: string, date: string }] }>(this.GET_URL + '/upcoming-races').pipe(map(
            upcomingRacesData => {
                return upcomingRacesData.upcomingRaces.map(upcomingRace => {
                    return {
                        id: upcomingRace._id,
                        name: upcomingRace.name,
                        date: upcomingRace.date
                    }
                })
            }
        ));
    }


}
