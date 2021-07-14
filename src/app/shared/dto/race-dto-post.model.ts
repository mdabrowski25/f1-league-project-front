export class RaceDtoPost {
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


    constructor(name: string, date: string, scores: [{ position: number; racerAndTeam: { racer: { id: number; name: string; points: number }; team: { id: number; name: string; points: number } }; bestLapTime: number[] }]) {
        this.name = name;
        this.date = date;
        this.scores = scores;
    }
}
