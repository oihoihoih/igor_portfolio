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
      'El otro lado',
      2024,
      'Alberto de Toro y Javier Ruíz Caldera',
      'Bernat Bosch',
      'assets/project-imgs/el-otro-lado.jpeg',
      'Género 1',
      'https://www.youtube.com/watch?v=123456',
      'https://www.imdb.com/title/tt123456'
    );
  }

  closeButton(event: any) {
    console.log('close', event);
  }
}
