export class Racer {
    _id?: string;
    id: number;
    name: string;
    points: number;

    constructor(id: number, name: string, points: number) {
        this.id = id;
        this.name = name;
        this.points = points;
    }
}
