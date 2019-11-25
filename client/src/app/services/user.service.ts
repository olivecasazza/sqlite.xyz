import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { AppState } from '../models/state.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private state: StateService,
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
        // update state and view if successfull
        this.state.set({ ...createUserRequest });
        this.router.navigate([`/${createUserRequest.username}`]);
    }
}
