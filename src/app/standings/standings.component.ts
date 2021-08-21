import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    fetchErrorOccurred: boolean = false;
    loadingSub: Subscription | undefined;

    constructor(private data: DataService) {
    }

    ngOnInit(): void {
        this.data.getData();
        this.loadingSub = this.data.getArraysUpdated().subscribe(arrays => {
            this.loading = arrays.loading;
            this.fetchErrorOccurred = arrays.fetchErrorOccurred;
        });
    }

    ngOnDestroy(): void {
        if (this.loadingSub != undefined) {
            this.loadingSub.unsubscribe();
        }
    }


}
