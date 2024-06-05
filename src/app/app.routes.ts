import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './ui/layouts/user/user.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { AddLocationsComponent } from './pages/locations/add-locations.component';
import { authGuard } from './auth.guard';
import { StudentsComponent } from './pages/students/students.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
        component: UserComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'daily',
                component: DashboardComponent
            },
            {
                path: 'students',
                component: StudentsComponent
            }
        ]
    }
];
