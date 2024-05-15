import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImportOrdersComponent } from './pages/orders/import-orders/import-orders.component';
import { ImportOrdersDetailComponent } from './pages/orders/import-orders/import-orders-detail.component';
import { ImportExportContainerComponent } from './pages/orders/import-export-container/import-export-container.component';
import { ImportExportContainerDetailComponent } from './pages/orders/import-export-container/import-export-container-detail.component';
import { DriverLogComponent } from './pages/driver-log/driver-log.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ShippingLineComponent } from './pages/shipping-line/shipping-line.component';
import { AddShippingLineComponent } from './pages/shipping-line/add-shipping-line.component';
import { UserComponent } from './ui/layouts/user/user.component';
import { ExportOrdersDetailComponent } from './pages/orders/export-order/export-orders-detail.component';
import { ExportOrdersComponent } from './pages/orders/export-order/export-orders.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { AddLocationsComponent } from './pages/locations/add-locations.component';
import { AddCustomersComponent } from './pages/customers/add-customers.component';

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
                path: 'import-orders',
                component: ImportOrdersComponent
            },
            {
                path: 'import-orders/details/:guid',
                component: ImportOrdersDetailComponent
            },
            {
                path: 'export-orders',
                component: ExportOrdersComponent
            },
            {
                path: 'export-orders/details/:guid',
                component: ExportOrdersDetailComponent
            },
            {
                path: 'import-export-container',
                component: ImportExportContainerComponent
            },
            {
                path: 'import-export-container/filter/:id',
                component: ImportExportContainerComponent
            },
            {
                path: 'import-export-container/details',
                component: ImportExportContainerDetailComponent
            },
            {
                path: 'driver-log',
                component: DriverLogComponent
            },
            {
                path: 'customers',
                component: CustomersComponent
            },
            {
                path: 'customers/add',
                component: AddCustomersComponent
            },
            {
                path: 'shipping-line',
                component: ShippingLineComponent
            },
            {
                path: 'shipping-line/add',
                component: AddShippingLineComponent
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
