import { Racer } from './racer.model';
import { Team } from './team.model';

export class RacerTeam {
    racer: Racer;
    team: Team;


    constructor(racer: Racer, team: Team) {
        this.racer = racer;
        this.team = team;
    }
}
