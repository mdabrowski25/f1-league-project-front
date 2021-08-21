export class Grid {
    position = 1;
    racerId: number;
    teamId: number;
    bestLapTime: string;


    constructor(racerId: number, teamId: number, bestLapTime: string) {
        this.position++;
        this.racerId = racerId;
        this.teamId = teamId;
        this.bestLapTime = bestLapTime;
    }
}
