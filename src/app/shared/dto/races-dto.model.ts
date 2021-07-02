

export class RacesDto {
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
        },
        bestLapTime: [number]
    }];


    constructor(id: number, name: string, date: string, scores: [{ position: number; racerAndTeam: { racer: { id: number; name: string; points: number }; team: { id: number; name: string; points: number } }; bestLapTime: [number] }]) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scores = scores;
    }
}
