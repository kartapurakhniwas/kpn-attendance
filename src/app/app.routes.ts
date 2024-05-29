import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './ui/layouts/user/user.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { AddLocationsComponent } from './pages/locations/add-locations.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'locations',
                component: LocationsComponent
            },
            {
                path: 'locations/add',
                component: AddLocationsComponent
            }
            
            
            
            
        ]
    }
];
