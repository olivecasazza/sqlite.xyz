import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { AppState } from '../models/state.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private state: StateService,
    ) { }

    async login(username, password) {
        // make login request to backend
        const requestUrl = `${environment.apiUrl}/auth/login`;
        const requestBody = {
            username,
            password,
        };
        const loginRequest = await this.http
            .post<any>(requestUrl, requestBody)
            .toPromise();

        // don't do anything if it failed
        if (!loginRequest) {
            return;
        }
        // update state and view if successfull
        this.state.set({ ...loginRequest });
        this.router.navigate([`${}`]);
    }

    logout() {
        const newState: AppState = {
            currentUser: {
                id: null,
                firstName: null,
                lastName: null,
                username: null,
                email: null,
                role: null,
                createdAt: null,
                updatedAt: null,
                datasets: null,
                token: null,
            }
        };
        this.state.set(newState);
    }
}
