import { Team } from './team.model';

export class RaceStats {
    raceName: string;
    raceDate: string;
    personalBestLapTime: number[];
    teamDriven: Team;


    constructor(raceName: string, raceDate: string, personalBestLapTime: number[], teamDriven: Team) {
        this.raceName = raceName;
        this.raceDate = raceDate;
        this.personalBestLapTime = personalBestLapTime;
        this.teamDriven = teamDriven;
    }
}
