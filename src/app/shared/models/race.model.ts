export class Race {
    id: string;
    name: string;
    date: string;
    scores: {
        position: number,
        racer: {
            id: string,
            name: string
        },
        team: {
            id: string,
            name: string
        }
        bestLapTIme: [number, number , number]
    }


    constructor(id: string, name: string, date: string, scores: { position: number; racer: { id: string; name: string }; team: { id: string; name: string }; bestLapTIme: [number, number, number] }) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scores = scores;
    }
}
