import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    POST_URL = 'http://localhost:3000/api/post';
    private token: string | undefined;
    private authStatusListener = new Subject<boolean>();
    private isLogged = false;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        const authData = {email: email, password: password};
        this.http.post<{ token: string }>(this.POST_URL + '/login', authData).subscribe(res => {
            this.token = res.token;
            if (this.token) {
                this.isLogged = true;
                this.authStatusListener.next(true);
            }
        });
    }

    logout() {
        this.token = undefined;
        this.isLogged = false;
        this.authStatusListener.next(false);
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
