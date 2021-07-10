import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-add-race',
    templateUrl: './add-race.component.html',
    styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {
    raceForm: FormGroup;

    constructor(private datePipe: DatePipe) {
        this.raceForm = new FormGroup({
            raceName: new FormControl(null, Validators.required),
            raceDate: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        const raceFromForm = {
            name: this.raceForm.value.raceName,
            date: this.datePipe.transform(this.raceForm.value.raceDate, 'dd-MM-yyyy HH:mm')
        }
        console.log(raceFromForm)
    }
}
