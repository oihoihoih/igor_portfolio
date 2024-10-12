import { Component } from '@angular/core';
import { DashService } from '../../../dashboard/services/dash.service';
import { Project } from '../../../model/project';
import { last } from 'rxjs';
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
  public animationState = 'out';

  constructor(private dashService: DashService) {
    this.dashService.getAllProjects().subscribe((res) => {
      this.projects = res.map((project) => {
        project.img = this.getImageUrl(project.img);

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

  open(id: string) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }
}
