import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticated: CanActivateFn = (route, state) => {
  //   const url = state.url;
  //   localStorage.setItem('url', url);

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    console.log('is authenticated');
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
