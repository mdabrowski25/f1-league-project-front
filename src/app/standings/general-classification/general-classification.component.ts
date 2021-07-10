import { Component, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { Racer } from '../../shared/model/racer.model';
import { RaceStats } from '../../shared/model/racestats.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-general-classification',
    templateUrl: './general-classification.component.html',
    styleUrls: ['./general-classification.component.css']
})
export class GeneralClassificationComponent implements OnInit {
    races: Race[] = [];
    racers: Racer[] = [];
    allRacesStats: RaceStats[] = [];

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getArraysUpdated().subscribe(arrays => {
            this.races = arrays.races;
            this.racers = arrays.racers;
            this.getAllRacesStats()
        });
    }

    getAllRacesStats() {
        let raceStats: RaceStats[] = [];
        for (let i = 0; i < this.races.length; i++) {
            let scores = this.races[i].scores;
            let name = this.races[i].name;
            let date = this.races[i].date;
            let raceId = this.races[i].id
            if (scores != undefined && date != undefined) {
                for (let j = 0; j < scores.length; j++) {
                    let racerStatObj = new RaceStats(
                       raceId, name, date, scores[j].bestLapTime, scores[j].racerAndTeam.team, scores[j].racerAndTeam.racer, scores[j].position
                    );
                    raceStats.push(racerStatObj);
                }
            }
        }
        this.allRacesStats = raceStats;
    }

    getRacersStatsFromRace(raceId: number) {
        let raceStats1 = this.allRacesStats.filter(race => race.raceId == raceId).slice();
        raceStats1.sort((a, b) => {
            if (a.driver.id > b.driver.id) {
                return 1;
            } else if (a.driver.id == b.driver.id) {
                return 0;
            } else {
                return -1;
            }
        });
        return raceStats1;
    }

    getRacerStatsFromRace(racerId: number, raceId: number) {
        let racersStatsFromRace = this.getRacersStatsFromRace(raceId);
        return racersStatsFromRace[racerId - 1];
    }


}
