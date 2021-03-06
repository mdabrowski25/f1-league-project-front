import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Racer } from '../shared/models/racer.model';
import { Team } from '../shared/models/team.model';
import { RacerTeam } from '../shared/models/racer-team.model';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {
    racers: Racer[] = [];

    teams: Team[] = [];

    racerTeam: RacerTeam[] = [];

    generatorSubs: Subscription | undefined;

    rbCount = 0;
    ferrariCount = 0;
    renaultCount = 0;
    mercedesCount = 0;
    mcLarenCount = 0;
    loading: boolean = false;
    fetchErrorOccurred: boolean = false;

    constructor(private data: DataService) {
        this.data.getData();
        this.generatorSubs = this.data.getArraysUpdated().subscribe(arrays => {
            this.racers = arrays.racers;
            this.teams = arrays.teams;
            this.loading = arrays.loading;
            this.fetchErrorOccurred = arrays.fetchErrorOccurred;
        });
    }

    ngOnDestroy(): void {
        if (this.generatorSubs != undefined) {
            this.generatorSubs.unsubscribe()
        }
    }

    ngOnInit(): void {
    }

    shuffleRacerAndTeam(): void {
        const randomRacerInt = Math.floor(Math.random() * this.racers.length);
        if (this.racers.length === 0) {
            return;
        }

        let shuffledRacer = this.racers[randomRacerInt];
        this.racers = this.racers.filter((e) => {
            return e.id !== shuffledRacer.id;
        });

        const randomTeamInt = Math.floor(Math.random() * this.teams.length);

        if (this.teams.length === 0) {
            return;
        }

        let shuffledTeam = this.teams[randomTeamInt];
        switch (shuffledTeam.name) {
            case 'Red Bull Racing': {
                this.rbCount++;
                if (this.rbCount === 2) {
                    this.deleteTeamFromArray(shuffledTeam);
                }
                break;
            }
            case 'Ferrari': {
                this.ferrariCount++;
                if (this.ferrariCount === 2) {
                    this.deleteTeamFromArray(shuffledTeam);
                }
                break;
            }
            case 'Renault': {
                this.renaultCount++;
                if (this.renaultCount === 2) {
                    this.deleteTeamFromArray(shuffledTeam);
                }
                break;
            }
            case 'Mercedes': {
                this.mercedesCount++;
                if (this.mercedesCount === 2) {
                    this.deleteTeamFromArray(shuffledTeam);
                }
                break;
            }
            case 'McLaren': {
                this.mcLarenCount++;
                if (this.mcLarenCount === 2) {
                    this.deleteTeamFromArray(shuffledTeam);
                }
                break;
            }
        }

        let racerTeamDto = new RacerTeam(shuffledRacer, shuffledTeam);
        this.racerTeam.push(racerTeamDto);
    }

    private deleteTeamFromArray(shuffledTeam: Team) {
        this.teams = this.teams.filter((e) => {
            return e.id !== shuffledTeam.id;
        });
    }
}
