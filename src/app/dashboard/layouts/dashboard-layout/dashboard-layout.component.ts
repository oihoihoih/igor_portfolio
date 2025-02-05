import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.css',
    standalone: false
})
export class DashboardLayoutComponent {
  public user = computed(() => this.authService.user());

  constructor(private authService: AuthService, private router: Router) {}

  // TODO: Aquí debería hacer que vaya a la página pública de la web (?) o a la página de inicio de sesión?
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
