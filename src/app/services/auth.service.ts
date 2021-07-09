import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    POST_URL = 'http://localhost:3000/api/post';
    private token: string | undefined;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        const authData = {email: email, password: password};
        this.http.post<{ token: string }>(this.POST_URL + '/login', authData).subscribe(res => {
            this.token = res.token;
        });
    }

    getToken() {
        return this.token;
    }
}
