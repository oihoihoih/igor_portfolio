import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashService } from '../../services/dash.service';
import { Project } from '../../../model/project';

@Component({
    selector: 'app-dash-project-list',
    templateUrl: './dash-project-list.component.html',
    styleUrl: './dash-project-list.component.css',
    standalone: false
})
export class DashProjectListComponent {
  public projects: Project[] = [];
  public cargando: boolean = true;
  public projectId!: string;
  public dialogIsOpen: boolean = false;

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
    this.dashboardService.deleteProject(id).subscribe(() => {
      this.getProjects();
    });
    this.dialogIsOpen = false;
  }

  // EDIT PROJECT
  editProject(id: string) {
    this.router.navigate(['/atoridashboard/project-edit', id]);
  }

  showModal(id: string): void {
    this.dialogIsOpen = true;
    this.projectId = id;
    // Lógica para mostrar el modal
  }

  hideModal(): void {
    this.dialogIsOpen = false;
  }
}
