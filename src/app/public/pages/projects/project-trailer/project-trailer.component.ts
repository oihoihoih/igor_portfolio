import { Component } from '@angular/core';

@Component({
  selector: 'app-project-trailer',
  standalone: false,

  templateUrl: './project-trailer.component.html',
  styleUrl: './project-trailer.component.css',
})
export class ProjectTrailerComponent {
  public trailer = 'Trailer url';
}
