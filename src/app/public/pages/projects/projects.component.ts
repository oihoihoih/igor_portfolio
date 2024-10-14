import { Component } from '@angular/core';
import { DashService } from '../../../dashboard/services/dash.service';
import { Project } from '../../../model/project';
import { SlideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [SlideInOutAnimation],
})
export class ProjectsComponent {
  public projects: Project[] = [];
  private lastId: string = '';
  public visibility: { [key: string]: boolean } = {};
  //public animationState: { [key: string]: 'in' | 'out' } = {};

  constructor(private dashService: DashService) {
    this.dashService.getAllProjects().subscribe((res) => {
      this.projects = res.map((project) => {
        project.img = this.getImageUrl(project.img);
        this.visibility[project._id] = false; // Inicializa la visibilidad
        //this.animationState[project._id] = 'out';
        return project;
      });
      console.log('proyecto', this.projects);
    });
  }

  // Acceso a la URL de la imagen
  getImageUrl(img: string): string {
    const backendUrl = 'http://localhost:3000';
    return `${backendUrl}${img}`;
  }

  // open(id: string) {
  //   // Cerrar el proyecto anterior
  //   if (this.lastId) {
  //     this.animationState[this.lastId] = 'out';
  //   }
  //   setTimeout(() => {
  //     // Abrir el proyecto
  //     this.animationState[id] = this.animationState[id] === 'in' ? 'out' : 'in';
  //     this.lastId = id;
  //   }, 500);
  // }

  open(id: string) {
    if (this.lastId) {
      this.visibility[this.lastId] = !this.visibility[this.lastId];
    }
    setTimeout(() => {
      this.visibility[id] = !this.visibility[id];
      this.lastId = id;
    }, 500);
  }
}
