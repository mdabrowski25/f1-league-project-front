import { Scoreboard } from '../model/scoreboard.model';

export class RacesDto {
    id: number;
    name: string;
    date: string;
    scores: {
        standings: Scoreboard;
    };
    bestLapTime: string


    constructor(id: number, name: string, date: string, scores: { standings: Scoreboard }, bestLapTime: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.scores = scores;
        this.bestLapTime = bestLapTime;
    }
}
