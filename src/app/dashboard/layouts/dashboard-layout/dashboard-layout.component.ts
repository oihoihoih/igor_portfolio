import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { DashService } from '../../services/dash.service';
import { Project } from '../../../model/project';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  public user = computed(() => this.authService.user());
  private projects: Project[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashService
  ) {
    this.getProjects();
  }

  onLogout() {
    this.authService.logout();
    // this.router.navigateByUrl('/auth/login');
  }

  getProjects() {
    this.dashboardService.getAllProjects().subscribe((projects) => {
      console.log(projects);
      this.projects = projects;
    });
  }
}
