import { Component, computed, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'igor_pf';

  constructor(private authService: AuthService, private router: Router) {}

  // TODO: Mirar si la autenticación es mejor aquí o en el módulo dashboard
  public finishedAuthChecking = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return false;
    return true;
  });
  //
  //   public authStatusChangedEffect = effect(() => {
  //     console.log('authstatus', this.authService.authStatus());
  //     switch (this.authService.authStatus()) {
  //       case AuthStatus.checking:
  //         return;
  //       case AuthStatus.authenticated:
  //         this.router.navigateByUrl('/atoridashboard');
  //         return;
  //       case AuthStatus.notAuthenticated:
  //         this.router.navigateByUrl('/auth/login');
  //         return;
  //     }
  //   });
}
