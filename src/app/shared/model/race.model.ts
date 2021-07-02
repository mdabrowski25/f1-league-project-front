import { RaceData } from './racedata.model';

export class Race {
    id: number;
    name: string;
    date?: string | null;
    scores?: RaceData[];


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.scores = []
    }
}
