import { Component, OnInit } from '@angular/core';
import { RacerTeamDto } from '../shared/dto/racer-team-dto.model';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
    racers: Racer[] = [];

    teams: Team[] = [];

    racerTeam: RacerTeamDto[] = [];

    rbCount = 0;
    ferrariCount = 0;
    renaultCount = 0;
    mercedesCount = 0;
    mcLarenCount = 0;

    constructor(private http: HttpService) {
    }

    ngOnInit(): void {
        this.http.getRacers().subscribe((data) => {
            this.racers = data.racers;
        });
        this.http.getTeams().subscribe(data => {
            this.teams = data.teams;
        });
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
        switch (shuffledTeam.name){
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

        let racerTeamDto = new RacerTeamDto(shuffledRacer, shuffledTeam);
        this.racerTeam.push(racerTeamDto);
    }

    private deleteTeamFromArray(shuffledTeam: Team) {
        this.teams = this.teams.filter((e) => {
            return e.id !== shuffledTeam.id;
        });
    }
}
