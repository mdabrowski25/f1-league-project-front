import { RacerTeamDto } from '../dto/racer-team-dto.model';
import { Racer } from './racer.model';

export class RaceData {
    standings: Map<number, Racer>
    racersAndTeams: RacerTeamDto[];
    bestLapTime: string;


    constructor(standings: Map<number, Racer>, racersAndTeams: RacerTeamDto[], bestLapTime: string) {
        this.standings = standings;
        this.racersAndTeams = racersAndTeams;
        this.bestLapTime = bestLapTime;
    }
}
