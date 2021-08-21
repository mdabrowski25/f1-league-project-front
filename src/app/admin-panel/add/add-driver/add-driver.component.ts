import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RacerDto } from '../../../shared/dto/racer-dto.model';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  racerForm: FormGroup;

  constructor(private http: HttpService) {
    this.racerForm = new FormGroup({
      racerName: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const racerFromForm: RacerDto = {
      name: this.racerForm.value.racerName,
    }
    this.http.postRacer(racerFromForm);
  }
}
