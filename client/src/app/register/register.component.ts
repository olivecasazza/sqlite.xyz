import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    hidePassword = true;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {}

    createUser = () => {
        // dont do anything if we dont
        // have username and password
        if (this.username.errors || this.username.errors || this.email.errors) {
            return;
        }
        // call the login service
        return this.userService.createUser(
            this.firstName.value,
            this.lastName.value,
            this.username.value,
            this.password.value,
            this.email.value,
        );
    };

    navigateToLogin = () => this.router.navigateByUrl('login');
}
