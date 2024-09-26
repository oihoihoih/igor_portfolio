import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashService } from '../../services/dash.service';
import { Project } from '../../../model/project';

@Component({
  selector: 'app-dash-project-list',
  templateUrl: './dash-project-list.component.html',
  styleUrl: './dash-project-list.component.css',
})
export class DashProjectListComponent {
  private projects: Project[] = [];

  constructor(private dashboardService: DashService, private router: Router) {
    this.getProjects();
  }

  getProjects() {
    this.dashboardService.getAllProjects().subscribe((projects) => {
      console.log(projects);
      this.projects = projects;
    });
    this.printProjects();
  }

  printProjects() {
    console.log('print', this.projects);
  }
}
