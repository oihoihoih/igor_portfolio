import { Component } from '@angular/core';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DashService } from '../../../dashboard/services/dash.service';
import { Project } from '../../../model/project';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class ProjectsComponent {
  public projects: Project[] = [];
  public selectedFileUrl: string | ArrayBuffer | null = null;
  public collapsedStates: { [key: string]: boolean } = {};

  constructor(private dashService: DashService) {
    this.dashService.getAllProjects().subscribe((res) => {
      this.projects = res.map((project) => {
        project.img = this.getImageUrl(project.img);
        this.collapsedStates[project._id] = true;
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

  // Toggle collapse
  toggle(id: string) {
    this.collapsedStates[id] = !this.collapsedStates[id];
  }

  // Expand project description
  expand(id: string) {
    this.collapsedStates[id] = false;
  }

  // Collapse project description
  collapse(id: string) {
    this.collapsedStates[id] = true;
  }
}
