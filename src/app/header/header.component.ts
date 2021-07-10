import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    faBars = faBars;
    userLogged: boolean = false;

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
    }

}
