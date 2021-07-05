import { Component, Input, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { Racer } from '../../shared/model/racer.model';

@Component({
    selector: 'app-general-classification',
    templateUrl: './general-classification.component.html',
    styleUrls: ['./general-classification.component.css']
})
export class GeneralClassificationComponent implements OnInit {
    @Input() races: Race[] = [];
    @Input() racers: Racer[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }


    getRacerPosition(id: number, raceId: number) {
        let race = this.races.find(race => race.id == raceId);
        if (race != undefined) {
            if (race.scores != undefined) {
                for (let i = 0; i < race.scores.length; i++) {
                    if (race.scores[i].racerAndTeam.racer.id == id) {
                        return race.scores[i].position;
                    }
                }
            }
        }
        return null;
    }

    getRacerTeam(id: number, raceId: number) {
        let race = this.races.find(race => race.id == raceId);
        if (race != undefined) {
            if (race.scores != undefined) {
                for (let i = 0; i < race.scores.length; i++) {
                    if (race.scores[i].racerAndTeam.racer.id == id) {
                        return race.scores[i].racerAndTeam.team.name;
                    }
                }
            }
        }
        return null;
    }

    getRacerLapTime(id: number, raceId: number) {
        let race = this.races.find(race => race.id == raceId);
        if (race != undefined) {
            if (race.scores != undefined) {
                for (let i = 0; i < race.scores.length; i++) {
                    if (race.scores[i].racerAndTeam.racer.id == id) {
                        return race.scores[i].bestLapTime;
                    }
                }
            }
        }
        return null;
    }

    getRacerEarnedPoints(id: number, raceId: number) {
        let race = this.races.find(race => race.id == raceId);
        if (race != undefined) {
            if (race.scores != undefined) {
                for (let i = 0; i < race.scores.length; i++) {
                    if (race.scores[i].racerAndTeam.racer.id == id) {
                        return race.scores[i].racerAndTeam.racer.points;
                    }
                }
            }
        }
        return null;
    }

    getRacerLapTimeString(id: number, raceId: number): string {
        let racerLapTime = this.getRacerLapTime(id, raceId);
        if (racerLapTime != null) {
            return racerLapTime[0] + ':' + racerLapTime[1] + ':' + racerLapTime[2];
        }
        return '';
    }
}
