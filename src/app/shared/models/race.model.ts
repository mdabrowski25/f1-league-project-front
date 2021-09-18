export class Race {
    id: string;
    name: string;
    date: string;
    scores: [{
        position: number,
        racerAndTeam: {
            racer: {
                id: string,
                name: string,
                points: number
            },
            team: {
                id: string,
                name: string,
                points: number
            }
        },
        bestLapTime: number[]
    }];
    bestLapTime: number[]


    constructor(id: string, name: string, date: string, scores: [{ position: number; racerAndTeam: { racer: { id: string; name: string; points: number }; team: { id: string; name: string; points: number } }; bestLapTime: [number, number, number] }], bestLapTime: [number, number, number]) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scores = scores;
        this.bestLapTime = bestLapTime;
    }
}
