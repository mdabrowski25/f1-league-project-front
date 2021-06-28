import { Component, OnInit } from '@angular/core';
import { RacerTeamDto } from '../shared/dto/racer-team-dto.model';
import { Racer } from '../shared/model/racer.model';
import { Team } from '../shared/model/team.model';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
    racers = [
        new Racer(1,'Piotrula'),
        new Racer(2,'Daber'),
        new Racer(3,'Juri'),
        new Racer(4,'Werty'),
        new Racer(5,'Kopyt'),
        new Racer(6,'Zbychu'),
        new Racer(7,'Ginol'),
        new Racer(8,'grzywek'),
        new Racer(9,'BlyatMAN')
    ];

    teams = [
        new Team(1,'Red Bull Racing'),
        new Team(2,'Red Bull Racing'),
        new Team(3,'Renault'),
        new Team(4,'Renault'),
        new Team(5,'Ferrari'),
        new Team(6,'Ferrari'),
        new Team(7,'Mercedes'),
        new Team(8,'Mercedes'),
        new Team(9,'McLaren'),
        new Team(10,'McLaren')
    ];

    racerTeam: RacerTeamDto[] = [];

    constructor(private http: HttpService) {
    }

    ngOnInit(): void {
        // this.http.getRacers().subscribe((data) => {
        //     this.racers = data.racers;
        // });
    }

    shuffleRacerAndTeam(): RacerTeamDto {
        const randomRacerInt = Math.floor(Math.random() * this.racers.length);

        if (this.racers.length === 0){return new RacerTeamDto(new Racer(69,"*"), new Team(69,"*"))}

        let shuffledRacer = this.racers[randomRacerInt];
        this.racers = this.racers.filter((e) => {
            return e.id !== shuffledRacer.id;
        });

        const randomTeamInt = Math.floor(Math.random() * this.teams.length);

        if (this.teams.length === 0){return new RacerTeamDto(new Racer(69,"*"), new Team(69,"*"))}

        let shuffledTeam = this.teams[randomTeamInt];
        this.teams = this.teams.filter((e) => {
            return e.id !== shuffledTeam.id;
        })

        let racerTeamDto = new RacerTeamDto(shuffledRacer, shuffledTeam);
        this.racerTeam.push(racerTeamDto);
        return racerTeamDto;
    }
}
