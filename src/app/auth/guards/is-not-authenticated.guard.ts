import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// export const isNotAuthenticated: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//
//   // Mientras está verificando, no hagas ninguna acción
//   if (authService.authStatus() === AuthStatus.checking) {
//     console.log('Verificando estado de autenticación...');
//     return false;
//   }
//
//   // Si no está autenticado, permite acceso
//   return true;
// };

export const isNotAuthenticated: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Mientras está verificando, no hagas ninguna acción
  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  // Si está autenticado, redirige al dashboard
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/atoridashboard');
    return false;
  }

  // Si no está autenticado, permite acceso
  return true;
};
