import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './ui/layouts/user/user.component';
import { authGuard } from './auth.guard';
import { StudentsComponent } from './pages/students/students.component';
import { AttandanceComponent } from './pages/attandance/attandance.component';
import { AttandanceTableComponent } from './pages/attandance-table/attandance.component';

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
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'students',
                component: StudentsComponent
            },
            {
                path: 'attandance',
                component: AttandanceComponent
            },
            {
                path: 'attandance-table',
                component: AttandanceTableComponent
            },
            
            
        ]
    }
];
