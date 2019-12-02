import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    hidePassword = true;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {}

    login = async () => {
        // dont do anything if we dont
        // have username and password
        if (this.username.errors || this.username.errors) {
            return;
        }
        // call the login service
        await this.authService.login(this.username.value, this.password.value);
    };

    navigateToRegister = () => this.router.navigateByUrl('register')
}
