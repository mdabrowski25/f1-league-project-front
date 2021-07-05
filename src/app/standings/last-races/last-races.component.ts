import { Component, Input, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';

@Component({
    selector: 'app-last-races',
    templateUrl: './last-races.component.html',
    styleUrls: ['./last-races.component.css']
})
export class LastRacesComponent implements OnInit {
    @Input() races: Race[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
