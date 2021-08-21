export class UpcomingRaceDto {
    name: string;
    date: string | null;


    constructor(name: string, date: string) {
        this.name = name;
        this.date = date;
    }
}
