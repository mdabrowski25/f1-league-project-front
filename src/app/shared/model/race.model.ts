import { RaceData } from './racedata.model';

export class Race {
    id: number;
    name: string;
    scores?: Map<number, RaceData>;


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
