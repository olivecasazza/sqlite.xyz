import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { UploadComponent } from './upload/upload.component';
import { DatasetComponent } from './dataset/dataset.component';

const routes: Routes = [
    // login and register components
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // user level components
    { path: ':username', canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DatasetListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':datasetId',
                component: DatasetComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'upload',
                component: UploadComponent,
                canActivate: [AuthGuard]
            }
        ]
    },

    // otherwise redirect to login
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
