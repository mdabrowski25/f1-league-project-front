export class Team {
    _id?: string;
    id: number;
    name: string;
    points: number;


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.points = 0;
    }
}
