import { Component, Input, HostBinding } from '@angular/core';
import { Project } from '../../../../model/project';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-project-trailer',
  standalone: false,

  templateUrl: './project-trailer.component.html',
  styleUrl: './project-trailer.component.css',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.8 }),
        animate('150ms ease-in-out', style({ opacity: 1, scale: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 0, scale: 1 }),
        animate('150ms ease-in-out', style({ opacity: 0, scale: 0.8 })),
      ]),
    ]),
  ],
})
export class ProjectTrailerComponent {
  @Input({ required: true }) project!: Project;
  @HostBinding('@animation') animationState = true;

  public trailer = 'Trailer url';
}
