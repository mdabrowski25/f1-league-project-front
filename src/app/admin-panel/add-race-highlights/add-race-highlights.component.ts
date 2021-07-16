import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RaceDtoPost } from '../../shared/dto/race-dto-post.model';
import { Racer } from '../../shared/model/racer.model';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Team } from '../../shared/model/team.model';

@Component({
    selector: 'app-add-race-highlights',
    templateUrl: './add-race-highlights.component.html',
    styleUrls: ['./add-race-highlights.component.css']
})
export class AddRaceHighlightsComponent implements OnInit, OnDestroy {
    raceForm: FormGroup;
    raceName: FormControl;
    raceDate: FormControl;
    racers: Racer[] = [];
    teams: Team[] = []
    racerSub: Subscription | undefined;

    constructor(private data: DataService, private fb: FormBuilder) {
        this.data.getData();
        this.racerSub = data.getArraysUpdated().subscribe(arrays => {
            this.racers = arrays.racers;
            this.teams = arrays.teams;
        });

        this.raceName = this.fb.control([null], [Validators.required]);
        this.raceDate = this.fb.control([null], [Validators.required]);
        this.raceForm = this.fb.group({
            raceName: this.raceName,
            raceDate: this.raceDate,
            gridPos0: this.fb.control([null], [Validators.required]),
            teamSelect0: this.fb.control([null], [Validators.required]),
            bestLapTime0: this.fb.control([null], [Validators.required]),
            gridPos1: this.fb.control([null], [Validators.required]),
            teamSelect1: this.fb.control([null], [Validators.required]),
            bestLapTime1: this.fb.control([null], [Validators.required]),
            gridPos2: this.fb.control([null], [Validators.required]),
            teamSelect2: this.fb.control([null], [Validators.required]),
            bestLapTime2: this.fb.control([null], [Validators.required]),
            gridPos3: this.fb.control([null], [Validators.required]),
            teamSelect3: this.fb.control([null], [Validators.required]),
            bestLapTime3: this.fb.control([null], [Validators.required]),
            gridPos4: this.fb.control([null], [Validators.required]),
            teamSelect4: this.fb.control([null], [Validators.required]),
            bestLapTime4: this.fb.control([null], [Validators.required]),
            gridPos5: this.fb.control([null], [Validators.required]),
            teamSelect5: this.fb.control([null], [Validators.required]),
            bestLapTime5: this.fb.control([null], [Validators.required]),
            gridPos6: this.fb.control([null], [Validators.required]),
            teamSelect6: this.fb.control([null], [Validators.required]),
            bestLapTime6: this.fb.control([null], [Validators.required]),
            gridPos7: this.fb.control([null], [Validators.required]),
            teamSelect7: this.fb.control([null], [Validators.required]),
            bestLapTime7: this.fb.control([null], [Validators.required]),
            gridPos8: this.fb.control([null], [Validators.required]),
            teamSelect8: this.fb.control([null], [Validators.required]),
            bestLapTime8: this.fb.control([null], [Validators.required]),
            gridPos9: this.fb.control([null], [Validators.required]),
            teamSelect9: this.fb.control([null], [Validators.required]),
            bestLapTime9: this.fb.control([null], [Validators.required])
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
                bestLapTime: [1, 24, 365]
            }]
        }
        console.log(this.raceForm)
    }

    ngOnDestroy(): void {
        if (this.racerSub != undefined) {
            this.racerSub.unsubscribe();
        }
    }

    submitDisabled() {
        return !(this.raceForm.controls['raceName'].touched && this.raceForm.controls['raceName'].valid &&
            this.raceForm.controls['raceDate'].touched && this.raceForm.controls['raceDate'].valid)
    }

    markAsTouched(name: string) {
        this.raceForm.controls[name].markAsTouched()
    }
}
