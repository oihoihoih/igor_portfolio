import { Component, Input } from '@angular/core';
import { Project } from '../../../../model/project';

@Component({
  selector: 'app-project-trailer',
  standalone: false,

  templateUrl: './project-trailer.component.html',
  styleUrl: './project-trailer.component.css',
})
export class ProjectTrailerComponent {
  @Input({ required: true }) project!: Project;
  public trailer = 'Trailer url';
}
