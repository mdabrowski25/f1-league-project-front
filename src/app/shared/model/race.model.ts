import { RaceData } from './racedata.model';

export class Race {
    id: number;
    name: string;
    scores: Map<number, RaceData>;


    constructor(id: number, name: string, scores: Map<number, RaceData>) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }
}
