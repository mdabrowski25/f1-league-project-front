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
                this.setAuthTimer(expiresInDuration);
                this.isLogged = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(this.token, expirationDate)
            }
        });
    }

    autoAuthUser() {
        const authInfo = AuthService.getAuthData();
        const now = new Date();
        if (!authInfo) {
            return;
        }
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.isLogged = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }


    }

    private static getAuthData(): { token: string, expirationDate: Date } | undefined {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    private setAuthTimer(duration: number) {
        //duration in seconds
        this.tokenTimer = window.setTimeout(() => {
            this.logout();
            alert("Sesja wygasła");
        }, duration * 1000);
    }

    logout() {
        this.token = undefined;
        this.isLogged = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        AuthService.clearAuthData();
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

    saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private static clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }
}
