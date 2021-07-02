import { RacerTeam } from './racer-team.model';


export class RaceData {
    position: number;
    racerAndTeam: RacerTeam;
    bestLapTime: number[];


    constructor(position: number, racerAndTeam: RacerTeam, bestLapTime: number[]) {
        this.position = position;
        this.racerAndTeam = racerAndTeam;
        this.bestLapTime = bestLapTime;
    }
}
