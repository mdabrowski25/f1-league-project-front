import { Racer } from '../model/racer.model';
import { Team } from '../model/team.model';

export class RacerTeamDto {
    racer: Racer;
    team: Team;


    constructor(racer: Racer, team: Team) {
        this.racer = racer;
        this.team = team;
    }
}
