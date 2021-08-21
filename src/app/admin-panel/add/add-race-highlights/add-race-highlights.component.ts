import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RaceDtoPost } from '../../../shared/dto/race-dto-post.model';
import { Racer } from '../../../shared/model/racer.model';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Team } from '../../../shared/model/team.model';
import { Grid } from '../../../shared/model/grid.model';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../../services/http.service';

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
            this.sortRacersAndTeamsByIds();
            for (let i = 0; i < this.racers.length; i++) {
                this.grid.push(new Grid(0, 0, ''));
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
        const pointsArray: number[] = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
        if (!transformedDate) {
            return;
        }
        const raceFromForm: RaceDtoPost = {
            name: this.raceForm.value.raceName,
            date: transformedDate,
            scores: [{
                position: 1,
                racerAndTeam: {
                    racer: {
                        id: this.grid[0].racerId,
                        name: this.racers[this.grid[0].racerId-1].name,
                        points: pointsArray[0]
                    },
                    team: {
                        id: this.grid[0].teamId,
                        name: this.teams[this.grid[0].teamId-1].name,
                        points: pointsArray[0]
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
                        name: this.racers[this.grid[i].racerId-1].name,
                        points: pointsArray[i]
                    },
                    team: {
                        id: this.grid[i].teamId,
                        name:this.teams[this.grid[i].teamId-1].name,
                        points: pointsArray[i]
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

    private sortRacersAndTeamsByIds() {
        this.racers.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id === b.id) {
                return 0;
            } else {
                return 1;
            }
        });
        this.teams.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id === b.id) {
                return 0;
            } else {
                return 1;
            }
        })
    }
}
