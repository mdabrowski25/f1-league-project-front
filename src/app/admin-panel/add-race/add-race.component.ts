import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { UpcomingRaceDto } from '../../shared/dto/upcoming-race-dto.model';

@Component({
    selector: 'app-add-race',
    templateUrl: './add-race.component.html',
    styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {
    raceForm: FormGroup;

    constructor(private datePipe: DatePipe, private http: HttpService) {
        this.raceForm = new FormGroup({
            raceName: new FormControl(null, Validators.required),
            raceDate: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        const raceFromForm: UpcomingRaceDto = {
            name: this.raceForm.value.raceName,
            date: this.datePipe.transform(this.raceForm.value.raceDate, 'dd-MM-yyyy HH:mm')
        }
        this.http.postUpcomingRace(raceFromForm);
    }
}
