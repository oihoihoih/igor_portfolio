import { Component, Input, HostBinding, AfterViewInit } from '@angular/core';
import { Project } from '../../../../model/project';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-project-trailer',
  standalone: false,

  templateUrl: './project-trailer.component.html',
  styleUrl: './project-trailer.component.css',
  animations: [
    trigger('animation', [
      state('hidden', style({ opacity: 0, scale: 0.8 })),
      state('visible', style({ opacity: 1, scale: 1 })),
      transition('hidden <=> visible', animate('150ms ease-in-out')),
    ]),
  ],
})
export class ProjectTrailerComponent implements AfterViewInit {
  @Input({ required: true }) project!: Project;
  @HostBinding('@animation') animationState = 'hidden';

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.animationState = 'visible';
  }

  close() {
    this.animationState = 'hidden';
  }

  public trailer = 'Trailer url';
}
