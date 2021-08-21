export class RaceDtoGet {
    id: number;
    name: string;
    date: string;
    scores: [{
        position: number,
        racerAndTeam: {
            racer: {
                id: number,
                name: string,
                points: number
            },
            team: {
                id: number,
                name: string,
                points: number
            }
        }
        bestLapTime: number[];
    }];
    bestLapTime: number[];


    constructor(id: number, name: string, date: string, scores: [{ position: number; racerAndTeam: { racer: { id: number; name: string; points: number }; team: { id: number; name: string; points: number } }; bestLapTime: number[] }], bestLapTime: number[]) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scores = scores;
        this.bestLapTime = bestLapTime;
    }
}
