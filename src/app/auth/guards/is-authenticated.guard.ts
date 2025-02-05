import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// export const isAuthenticated: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//
//   // Mientras está verificando, no hagas ninguna acción
//   if (authService.authStatus() === AuthStatus.checking) {
//     console.log('Verificando estado de autenticación...');
//     return false;
//   }
//
//   // Si está autenticado, permite acceso
//   if (authService.authStatus() === AuthStatus.authenticated) {
//     console.log('Guard. Usuario autenticado');
//     return true;
//   }
//
//   // router.navigateByUrl('/auth/login');
//   return false;
// };

export const isAuthenticated: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  // Si no está autenticado, redirige al login
  router.navigateByUrl('/auth/login');
  return false;
};
//
