import { Race } from '../model/race.model';

export class RacesDto {
    races: Race[];


    constructor(races: Race[]) {
        this.races = races;
    }
}
