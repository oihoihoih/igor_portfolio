import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticated } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticated } from './auth/guards';
import { GameComponent } from './public/shared/game/game.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'public/home', // Redirigir a la página principal pública
  //   pathMatch: 'full',
  // },

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
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '**',
    redirectTo: '', // Redirigir cualquier ruta desconocida a la página pública
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
