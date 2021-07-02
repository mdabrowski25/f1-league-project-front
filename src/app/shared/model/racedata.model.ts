import { RacerTeamDto } from '../dto/racer-team-dto.model';
import { Racer } from './racer.model';
import { Scoreboard } from './scoreboard.model';

export class RaceData {
    standings: Scoreboard;
    bestLapTime: string;


    constructor(standings: Scoreboard, racersAndTeams: RacerTeamDto[], bestLapTime: string) {
        this.standings = standings;
        this.racersAndTeams = racersAndTeams;
        this.bestLapTime = bestLapTime;
    }
}
