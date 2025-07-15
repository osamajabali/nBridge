import { Routes } from '@angular/router';
import { LayoutComponent } from './features/main-layout/layout/layout.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
    {
        path : 'login',
        loadComponent : () => import ('./features/authentication/login/login.component').then(m => m.LoginComponent)
    },
    {
        path : 'layout',
        component : LayoutComponent,
        children : [
            {
                path : '',
                loadComponent : () => import('./features/clients/clients.component').then(m => m.ClientsComponent)
            },
            {
                path : 'connections',
                loadComponent : () => import('./features/connections/connections.component').then(m => m.ConnectionsComponent)
            },
            {
                path : 'adapters',
                loadComponent : () => import('./features/adapter/adapter.component').then(m => m.AdapterComponent)
            },
            {
                path : 'integrations',
                loadComponent : () => import('./features/integrations/integrations.component').then(m => m.IntegrationsComponent)
            },
            {
                path : 'monitor',
                loadComponent : () => import('./features/monitor/monitor.component').then(m => m.MonitorComponent)
            },
            {
                path : 'monitor/:id',
                loadComponent : () => import('./features/monitor/monitor.component').then(m => m.MonitorComponent)
            },
        ]
    }
];
