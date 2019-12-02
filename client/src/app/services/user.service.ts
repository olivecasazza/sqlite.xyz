import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { AppState } from '../models/state.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private state: StateService,
        private authService: AuthService
    ) { }

    async createUser(firstName, lastName, username, password, email) {
        // make new user request to backend
        const requestUrl = `${environment.apiUrl}/user`;
        const requestBody = {
            firstName,
            lastName,
            username,
            password,
            email,
            role: 'TEST_USER'
        };
        const createUserRequest = await this.http
            .post<any>(requestUrl, requestBody)
            .toPromise();

        // don't do anything if it failed
        if (!createUserRequest) {
            return;
        }
        // log the user in if successfull
        this.authService.login(username, password);
    }
}
