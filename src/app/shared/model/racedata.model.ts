import { RacerTeamDto } from '../dto/racer-team-dto.model';

export class RaceData {
    racerAndTeam: RacerTeamDto;
    bestLapTime: string;


    constructor(racerAndTeam: RacerTeamDto, bestLapTime: string) {
        this.racerAndTeam = racerAndTeam;
        this.bestLapTime = bestLapTime;
    }
}
