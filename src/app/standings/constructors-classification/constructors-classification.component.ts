import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../shared/model/team.model';

@Component({
    selector: 'app-constructors-classification',
    templateUrl: './constructors-classification.component.html',
    styleUrls: ['./constructors-classification.component.css']
})
export class ConstructorsClassificationComponent implements OnInit {
    @Input() teams: Team[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
