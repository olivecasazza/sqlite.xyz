import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guards/auth.guard';
import { DatabaseListComponent } from './database-list/database-list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
    // login and register components
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // user level components
    { path: ':username', canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: DatabaseListComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'upload',
                component: UploadComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },

    // otherwise redirect to login
    { path: '**', redirectTo: '/login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
