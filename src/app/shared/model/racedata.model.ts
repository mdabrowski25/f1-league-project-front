import { RacerTeamDto } from '../dto/racer-team-dto.model';

export class RaceData {
    standings: Map<number, string>
    racerAndTeam: RacerTeamDto;
    bestLapTime: string;
    points: number;

    constructor(standings: Map<number, string>, racerAndTeam: RacerTeamDto, bestLapTime: string, points: number) {
        this.standings = standings;
        this.racerAndTeam = racerAndTeam;
        this.bestLapTime = bestLapTime;
        this.points = points;
    }
}
