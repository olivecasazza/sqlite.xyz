import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { AppState } from '../models/state.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private router: Router,
        private http: HttpClient,
        private state: StateService,
    ) {}

    async isAuthenticated(): Promise<boolean> {
        const currentState = await this.state.get();
        // make sure token exists
        if (
            !currentState ||
            !currentState.currentUser ||
            !currentState.currentUser.token
        ) {
            return false;
        }
        // use the jwt helper to see if the current token is expired
        const isTokenExpired = await helper.isTokenExpired(
            currentState.currentUser.token,
        );
        // return false if token is expired
        // otherwise user is authenticated
        return isTokenExpired === true ? false : true;
    }

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
        this.router.navigate([`/${loginRequest.username}/`]);
    }

    async logout() {
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
            },
        };
        await this.state.set(newState);
        this.router.navigate([`/login`]);
    }
}
