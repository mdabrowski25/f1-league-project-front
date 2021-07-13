import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    onLogin(form: NgForm) {
      if(form.invalid) {
          return;
      }
      this.isLoading = true;
      this.authService.login(form.value.email, form.value.password);
      this.isLoading = false;
      this.router.navigate(['/']).then();
    }
}
