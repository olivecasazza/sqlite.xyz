import { Observable } from 'rxjs';
import { User } from './user.model';

export interface AppState {
    currentUser: User;
}