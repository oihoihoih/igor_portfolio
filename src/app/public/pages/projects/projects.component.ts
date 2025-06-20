import { Component, ViewChild } from '@angular/core';
import { DashService } from '../../../dashboard/services/dash.service';
import { Project } from '../../../models/project';
import { SlideInOutAnimation } from '../../animations';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [SlideInOutAnimation],
  standalone: false,
})
export class ProjectsComponent {
  public projects: Project[] = [];
  private lastId: string = '';
  public visibility: { [key: string]: boolean } = {};
  @ViewChild(CdkPortal) portal!: CdkPortal;
  public projectOutput!: Project;
  private overlayRef: OverlayRef | null = null;

  constructor(private dashService: DashService, private overlay: Overlay) {
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

  open(id: string) {
    if (this.lastId) {
      this.visibility[this.lastId] = !this.visibility[this.lastId];
    }
    setTimeout(() => {
      this.visibility[id] = !this.visibility[id];
      this.lastId = id;
    }, 500);
  }

  openModal(project: Project) {
    this.projectOutput = project;
    // Configuración del Overlay
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'var(--dark);',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);
  }

  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
