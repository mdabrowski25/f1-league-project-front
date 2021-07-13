import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    POST_URL = 'http://localhost:3000/api/post';
    private token: string | undefined;
    private authStatusListener = new Subject<boolean>();
    private isLogged = false;
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    login(email: string, password: string) {
        const authData = {email: email, password: password};
        this.http.post<{ token: string, expiresIn: number }>(this.POST_URL + '/login', authData).subscribe(res => {
            this.token = res.token;
            if (this.token) {
                const expiresInDuration = res.expiresIn;
                this.tokenTimer = window.setTimeout(() => {
                    this.logout();
                    alert("Sesja wygasła");
                }, expiresInDuration * 1000);
                this.isLogged = true;
                this.authStatusListener.next(true);
            }
        });
    }

    logout() {
        this.token = undefined;
        this.isLogged = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/']).then();
    }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    userIsLogged(): boolean {
        return this.isLogged;
    }
}
