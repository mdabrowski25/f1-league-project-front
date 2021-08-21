import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { UpcomingRace } from '../../../shared/model/upcomingrace-model';

@Component({
    selector: 'app-edit-race',
    templateUrl: './edit-race.component.html',
    styleUrls: ['./edit-race.component.css']
})
export class EditRaceComponent implements OnInit {
    raceForm: FormGroup;
    racesToCome: UpcomingRace[] = [];

    constructor(private datePipe: DatePipe, private http: HttpService, private data: DataService) {
        this.raceForm = new FormGroup({
            raceName: new FormControl(null, Validators.required),
            raceDate: new FormControl(null, Validators.required),
            raceToEdit: new FormControl(null, Validators.required)
        });
        data.getData();
        data.getArraysUpdated().subscribe((arrays) => {
            this.racesToCome = arrays.racesToCome
        })
    }

    ngOnInit(): void {
    }

    onSubmit() {
        let transformedDate = this.datePipe.transform(this.raceForm.value.raceDate, 'dd-MM-yyyy HH:mm');
        if (!transformedDate) {
            return;
        }
        const raceFromForm: UpcomingRace = {
            name: this.raceForm.value.raceName,
            date: transformedDate,
            id: this.raceForm.value.raceToEdit
        }
        this.http.putUpcomingRace(raceFromForm);
    }

    isDisabled(): boolean {
        return this.raceForm.controls['raceName'].touched && this.raceForm.controls['raceDate'].touched &&
            this.raceForm.controls['raceDate'].valid && this.raceForm.controls['raceName'].valid;
    }
}
