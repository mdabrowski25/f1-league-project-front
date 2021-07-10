import { Component, OnInit } from '@angular/core';
import { Team } from '../../shared/model/team.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-constructors-classification',
    templateUrl: './constructors-classification.component.html',
    styleUrls: ['./constructors-classification.component.css']
})
export class ConstructorsClassificationComponent implements OnInit {
    teams: Team[] = [];

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getArraysUpdated().subscribe(arrays => {
            this.teams = arrays.teams;
        });
    }

}
