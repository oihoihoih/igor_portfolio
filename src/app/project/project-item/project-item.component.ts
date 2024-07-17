import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css',
})
export class ProjectItemComponent implements OnInit {
  // TODO: Crear una interfaz para el objeto proyecto. He creado un modelo, estudiar las diferencias
  // TODO: Arreglar la propiedad opcional en las variables

  public project?: Project;

  constructor() {}

  ngOnInit() {
    this.project = new Project(
      'Proyecto 1',
      2024,
      'Director 1',
      'DOP 1',
      'https://via.placeholder.com/150',
      'Género 1',
      'https://www.youtube.com/watch?v=123456',
      'https://www.imdb.com/title/tt123456'
    );
  }

  closeButton(event: any) {
    console.log('close', event);
  }
}
