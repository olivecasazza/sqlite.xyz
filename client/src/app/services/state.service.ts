import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../models/state.model';

@Injectable({
    providedIn: 'root',
})
export class StateService {

    private state: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(null);

    constructor(private http: HttpClient) {
        const savedState = JSON.parse(localStorage.getItem('state'));
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
        this.state.next({ ...newState, ...savedState });
    }

    public get(): AppState {
        const currentState = this.state.value;
        console.log('[stateService] fetching state: ', currentState);
        return currentState;
    }

    public async set(newState: AppState) {
        console.log('[stateService] setting state: ', newState);
        await this.state.next(newState);
        await localStorage.setItem('state', JSON.stringify(newState));
    }
}
