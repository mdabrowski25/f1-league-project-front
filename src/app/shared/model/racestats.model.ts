import { Team } from './team.model';
import { Racer } from './racer.model';

export class RaceStats {
    raceId: number;
    driver: Racer;
    raceName: string;
    raceDate: string;
    position: number;
    personalBestLapTime: number[];
    teamDriven: Team;


    constructor(raceId: number, raceName: string, raceDate: string, personalBestLapTime: number[], teamDriven: Team , driverId: Racer, position: number) {
        this.raceId = raceId;
        this.raceName = raceName;
        this.raceDate = raceDate;
        this.position = position;
        this.personalBestLapTime = personalBestLapTime;
        this.teamDriven = teamDriven;
        this.driver = driverId;
    }
}
