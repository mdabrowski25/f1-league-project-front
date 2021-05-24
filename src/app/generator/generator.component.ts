import { Component, OnInit } from '@angular/core';
import { RacerTeamDto } from '../shared/dto/racer-team-dto.model';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
    racers = [
        new Racer('Piotrula'),
        new Racer('Daber'),
        new Racer('Juri'),
        new Racer('Werty'),
        new Racer('Kopyt'),
        new Racer('Zbychu'),
        new Racer('Ginol'),
        new Racer('grzywek'),
        new Racer('BlyatMAN')
    ];

    teams = [
        new Team('Red Bull Racing'),
        new Team('Renault'),
        new Team('Ferrari'),
        new Team('Mercedes'),
        new Team('McLaren')
    ];

    racerTeam: RacerTeamDto[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    shuffleRacerAndTeam(): RacerTeamDto {
        const randomRacerInt = Math.floor(Math.random() * this.racers.length);
        let shuffledRacer = this.racers[randomRacerInt];
        this.racers = this.racers.filter((e) => {
            return e.name !== shuffledRacer.name;
        });

        const randomTeamInt = Math.floor(Math.random() * this.teams.length);
        let shuffledTeam = this.teams[randomTeamInt];
        this.teams = this.teams.filter((e) => {
            return e.name !== shuffledTeam.name;
        })

        let racerTeamDto = new RacerTeamDto(shuffledRacer, shuffledTeam);
        this.racerTeam.push(racerTeamDto);
        return racerTeamDto;
    }
}
