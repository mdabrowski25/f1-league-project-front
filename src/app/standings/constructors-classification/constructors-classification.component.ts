import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../../shared/model/team.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-constructors-classification',
    templateUrl: './constructors-classification.component.html',
    styleUrls: ['./constructors-classification.component.css']
})
export class ConstructorsClassificationComponent implements OnInit, OnDestroy {
    teams: Team[] = [];
    teamsSub: Subscription | undefined;

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.teamsSub = this.data.getArraysUpdated().subscribe(arrays => {
            this.teams = arrays.teams;
        });
    }

    ngOnDestroy(): void {
        if (this.teamsSub != undefined) {
            this.teamsSub.unsubscribe();
        }
    }

}
