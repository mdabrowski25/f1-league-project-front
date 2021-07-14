import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RaceDtoPost } from '../../shared/dto/race-dto-post.model';

@Component({
    selector: 'app-add-race-highlights',
    templateUrl: './add-race-highlights.component.html',
    styleUrls: ['./add-race-highlights.component.css']
})
export class AddRaceHighlightsComponent implements OnInit {
    raceForm: FormGroup;

    constructor() {
        this.raceForm = new FormGroup({
            raceName: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        const raceFromForm: RaceDtoPost = {
            name: this.raceForm.value.raceName,
            date: '',
            scores: [{
                position: 1,
                racerAndTeam: {
                    racer: {
                        id: 1,
                        name: '',
                        points: 25
                    },
                    team: {
                        id: 1,
                        name: '',
                        points: 25
                    }
                },
                bestLapTime: [1,24,365]
            }]
        }
    }
}
