import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticated } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticated } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    // guards
    canActivate: [isNotAuthenticated],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'atoridashboard',
    // guards
    canActivate: [isAuthenticated],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
