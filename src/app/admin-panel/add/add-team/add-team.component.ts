import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  teamForm: FormGroup;
  constructor(private http: HttpService) {
    this.teamForm = new FormGroup({
      teamName: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const teamFromForm: { name: string } = {
      name: this.teamForm.value.teamName,
    }
    this.http.postTeam(teamFromForm);
  }
}
