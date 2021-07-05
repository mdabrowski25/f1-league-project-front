import { RaceData } from './racedata.model';
import { Racer } from './racer.model';

export class Race {
    id: number;
    name: string;
    date?: string | null;
    scores?: RaceData[];
    racerWithBestLapTime?: Racer;
    bestLapTime?: number[];


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.scores = []
    }
}
