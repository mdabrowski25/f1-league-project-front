export class Grid {
    position = 1;
    racerId: string;
    teamId: string;
    bestLapTime: string;


    constructor(position: number, racerId: string, teamId: string, bestLapTime: string) {
        this.position = position;
        this.racerId = racerId;
        this.teamId = teamId;
        this.bestLapTime = bestLapTime;
    }
}
