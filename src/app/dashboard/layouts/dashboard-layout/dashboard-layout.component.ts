import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  public user = computed(() => this.authService.user());

  constructor(private authService: AuthService, private router: Router) {}
  //
  //   get status() {
  //     return this.authService.authStatus;
  //   }

  onLogout() {
    this.authService.logout();
    // this.router.navigateByUrl('/auth/login');
  }
}
