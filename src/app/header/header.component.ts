import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    faBars = faBars;
    userLogged: boolean = false;
    authListenerSubs: Subscription | undefined;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.userLogged = this.auth.userIsLogged();
        this.authListenerSubs = this.auth.getAuthStatusListener().subscribe((isAuthenticated => this.userLogged = isAuthenticated));
    }

    ngOnDestroy(): void {
        if (this.authListenerSubs != undefined) {
            this.authListenerSubs.unsubscribe();
        }
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']).then();
    }
}
