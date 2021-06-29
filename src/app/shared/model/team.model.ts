export class Team {
    _id?: string;
    id: number;
    name: string;


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
