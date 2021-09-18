import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';

import { DatePipe } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { Racer } from '../../../shared/models/racer.model';
import { Team } from '../../../shared/models/team.model';
import { Grid } from '../../../shared/models/grid.model';

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
    grid: Grid[] = [];

    constructor(private data: DataService, private fb: FormBuilder, private datePipe: DatePipe, private http: HttpService) {
        this.data.getData();
        this.racerSub = data.getArraysUpdated().subscribe(arrays => {
            this.racers = arrays.racers;
            this.teams = arrays.teams;
            for (let i = 0; i < this.racers.length; i++) {
                this.grid.push(new Grid(0, '', '', ''));
            }
        });
        this.raceName = this.fb.control([null], [Validators.required]);
        this.raceDate = this.fb.control([null], [Validators.required]);
        this.raceForm = this.fb.group({
            raceName: this.raceName,
            raceDate: this.raceDate
        });
    }

    ngOnInit(): void {

    }

    onSubmit() {
        let transformedDate = this.datePipe.transform(this.raceForm.value.raceDate, 'dd-MM-yyyy HH:mm');
        if (!transformedDate) {
            return;
        }
        const raceFromForm: {
            name: string,
            date: string,
            scores: [{
                position: number,
                racerAndTeam: {
                    racer: {
                        id: string,
                        name: string | undefined
                    },
                    team: {
                        id: string,
                        name: string | undefined
                    }
                },
                bestLapTime: number[]
            }]
        } = {
            name: this.raceForm.value.raceName,
            date: transformedDate,
            scores: [{
                position: 1,
                racerAndTeam: {
                    racer: {
                        id: this.grid[0].racerId,
                        name: this.racers.find(racer => racer.id === this.grid[0].racerId)?.name
                    },
                    team: {
                        id: this.grid[0].teamId,
                        name: this.teams.find(team => team.id === this.grid[0].teamId)?.name
                    }
                },
                bestLapTime: AddRaceHighlightsComponent.getIntArrayFromStringArray(this.grid[0].bestLapTime.split(':'))
            }]
        }
        for (let i = 1; i < this.grid.length; i++) {
            raceFromForm.scores.push({
                position: i+1,
                racerAndTeam: {
                    racer: {
                        id: this.grid[i].racerId,
                        name: this.racers.find(racer => racer.id === this.grid[i].racerId)?.name
                    },
                    team: {
                        id: this.grid[i].teamId,
                        name: this.teams.find(team => team.id === this.grid[i].teamId)?.name
                    }
                },
                bestLapTime: AddRaceHighlightsComponent.getIntArrayFromStringArray(this.grid[i].bestLapTime.split(':'))
            })
        }
        this.http.postRace(raceFromForm);
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

    private static getIntArrayFromStringArray(strings: string[]) {
        let array: number[] = [];
        for (let i = 0; i < strings.length; i++) {
           array.push(parseInt(strings[i]));
        }
        return array;
    }
}
