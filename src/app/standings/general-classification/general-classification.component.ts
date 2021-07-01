import { Component, Input, OnInit } from '@angular/core';
import { Race } from '../../shared/model/race.model';
import { Racer } from '../../shared/model/racer.model';

@Component({
  selector: 'app-general-classification',
  templateUrl: './general-classification.component.html',
  styleUrls: ['./general-classification.component.css']
})
export class GeneralClassificationComponent implements OnInit {
  @Input() races: Race[] = [];
  @Input() racers: Racer[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
