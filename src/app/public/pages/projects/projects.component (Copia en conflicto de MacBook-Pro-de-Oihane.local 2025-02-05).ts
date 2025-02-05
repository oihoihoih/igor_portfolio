import { Component, ViewChild } from '@angular/core';
import { DashService } from '../../../dashboard/services/dash.service';
import { Project } from '../../../model/project';
import { Overlay } from '@angular/cdk/overlay';
import { ProjectTrailerComponent } from './project-trailer/project-trailer.component';
import { CdkPortal } from '@angular/cdk/portal';
// import { SlideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: false,
})
export class ProjectsComponent {
  public projects: Project[] = [];
  private lastId: string = '';
  public visibility: { [key: string]: boolean } = {};
  @ViewChild(CdkPortal) portal!: CdkPortal;

  constructor(private dashService: DashService, private overlay: Overlay) {
    this.dashService.getAllProjects().subscribe((res) => {
      this.projects = res.map((project) => {
        project.img = this.getImageUrl(project.img);
        this.visibility[project._id] = false; // Inicializa la visibilidad
        //this.animationState[project._id] = 'out';
        return project;
      });
    });
  }

  // Acceso a la URL de la imagen
  getImageUrl(img: string): string {
    const backendUrl = 'http://localhost:3000';
    return `${backendUrl}${img}`;
  }

  open(id: string) {
    if (this.lastId === id) {
      console.log('if');
      this.visibility[this.lastId] = !this.visibility[this.lastId];
    }
    if (!this.lastId || this.lastId !== id) {
      this.visibility[this.lastId] = false;
      setTimeout(() => {
        console.log('settimeout');
        this.visibility[id] = !this.visibility[id];
        this.lastId = id;
      }, 500);
    }
  }

  openModal() {
    console.log('hola');
    const overlayRef = this.overlay.create();
    overlayRef.attach(this.portal);
  }
}
