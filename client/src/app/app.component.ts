import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadComponent } from './upload/upload.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StateService } from './services/state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    isAuthenticated: Observable<boolean>;
    opened: boolean;

    private _mobileQueryListener: () => void;

    constructor(
        public dialog: MatDialog,
        private authService: AuthService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private state: StateService,
        private router: Router,
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.isAuthenticated = this.authService.isLoggedIn.asObservable();
    }

    navigateToHome = async () => {
        const state = await this.state.get();
        const username = state.currentUser.username;
        this.router.navigateByUrl(`${username}`);
    };

    navigateToUpload = async () => {
        const state = await this.state.get();
        const username = state.currentUser.username;
        this.router.navigateByUrl(`${username}/upload`);
    };

    logout = () => this.authService.logout();

    toggleSideNav = () => (this.opened = !this.opened);

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
