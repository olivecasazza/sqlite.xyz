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
        this.state.next({...savedState});
    }

    public async get(): Promise<AppState> {
        const currentState = await this.state.value;
        return currentState;
    }

    public async set(newState: AppState) {
        this.state.next(newState);
        localStorage.setItem('state', JSON.stringify(newState));
    }
}
