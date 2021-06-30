import { RacerTeamDto } from '../dto/racer-team-dto.model';

export class RaceData {
    racerAndTeam: RacerTeamDto;
    bestLapTime: string;
    points: number;


    constructor(racerAndTeam: RacerTeamDto, bestLapTime: string, points: number) {
        this.racerAndTeam = racerAndTeam;
        this.bestLapTime = bestLapTime;
        this.points = points;
    }
}
