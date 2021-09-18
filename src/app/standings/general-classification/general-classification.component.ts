import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Race } from '../../shared/models/race.model';
import { Racer } from '../../shared/models/racer.model';

@Component({
    selector: 'app-general-classification',
    templateUrl: './general-classification.component.html',
    styleUrls: ['./general-classification.component.css']
})
export class GeneralClassificationComponent implements OnInit, OnDestroy {
    races: Race[] = [];
    racers: Racer[] = [];
    classificationSubs: Subscription | undefined;

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.classificationSubs = this.data.getArraysUpdated().subscribe(arrays => {
            this.races = arrays.races;
            this.racers = arrays.racers;
        });
    }

    getRacerPositionInRace(racer: Racer, race: Race) {
        if (!race.scores) {
            return;
        }
        let find = race.scores.find(el => {
            return el.racerAndTeam.racer.id === racer.id
        });
        if (!find) {
            return;
        }
        return find.position;
    }

    getRacerTeamInRace(racer: Racer, race: Race) {
        if (!race.scores) {
            return;
        }
        let find = race.scores.find(el => {
            return el.racerAndTeam.racer.id === racer.id
        });
        if (!find) {
            return;
        }
        return find.racerAndTeam.team.name;
    }

    getRacerBestLapTimeInRace(racer: Racer, race: Race): {bestLap: string, bestOverall: boolean} {
        if (!race.scores) {
            return {bestLap: '', bestOverall: false};
        }
        let find = race.scores.find(el => {
            return el.racerAndTeam.racer.id === racer.id
        });
        if (!find) {
            return {bestLap: '', bestOverall: false};
        }
        let bestLapTime = find.bestLapTime;
        let bestLapTimeString = bestLapTime[0] + ':' + bestLapTime[1] + ':' + bestLapTime[2];
        return {bestLap: bestLapTimeString, bestOverall: race.bestLapTime === find.bestLapTime}
    }

    getRacerPointsGot(racer: Racer, race: Race) {
        const pointsArray: number[] = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
        let position = this.getRacerPositionInRace(racer, race);
        if (!position){
            return;
        }
        let bestOverall = this.getRacerBestLapTimeInRace(racer, race).bestOverall;
        if (bestOverall) {
            return pointsArray[position - 1] + 1;
        }
        return pointsArray[position - 1];
    }


    ngOnDestroy(): void {
        if (this.classificationSubs != undefined) {
            this.classificationSubs.unsubscribe();
        }
    }


}
