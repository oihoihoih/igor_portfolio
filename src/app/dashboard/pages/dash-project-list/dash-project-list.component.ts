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
  public projects: Project[] = [];
  public cargando: boolean = true;

  constructor(private dashboardService: DashService, private router: Router) {
    this.getProjects();
  }

  getProjects() {
    this.cargando = true;
    this.dashboardService.getAllProjects().subscribe((projects) => {
      console.log(projects);
      this.cargando = false;
      this.projects = projects;
    });
  }

  // ADD PROJECT
  addProject() {
    console.log('añadir');
    this.router.navigate(['/atoridashboard/project-add']);
  }

  // DELETE PROJECT
  deleteProject(id: string) {
    console.log('eliminar', id);
    this.dashboardService.deleteProject(id).subscribe(() => {
      this.getProjects();
    });
  }
}
