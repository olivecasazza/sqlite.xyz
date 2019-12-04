import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadComponent } from './upload/upload.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

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
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.isAuthenticated = this.authService.isLoggedIn.asObservable();
    }

    openUploadModal = () => {
        const dialogRef = this.dialog.open(UploadComponent);
        dialogRef.afterClosed().subscribe((result) => {
            const userId = this.route.snapshot.paramMap.get('username');
            this.router.navigateByUrl(`${userId}`);
        });
    };

    logout = () => this.authService.logout();

    toggleSideNav = () => (this.opened = !this.opened);

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
