import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-add-project',
  templateUrl: './dash-add-project.component.html',
  styleUrl: './dash-add-project.component.css',
})
export class DashAddProjectComponent {
  public addProjectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dashService: DashService,
    private router: Router
  ) {
    this.createForm();
  }

  //  TODO: Añadir un validador para las url
  createForm() {
    this.addProjectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      year: ['', [Validators.required]],
      director: ['', [Validators.required]],
      dop: ['', [Validators.required]],
      category: ['', [Validators.required]],
      img: ['', [Validators.required]],
      trailerUrl: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('enviado', this.addProjectForm.value);
    this.dashService.createProject(this.addProjectForm.value).subscribe({
      next: () => {
        console.log('Proyecto creado');
        this.router.navigateByUrl('/atoridashboard');
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }

  cancelSubmit() {
    //  TODO: Añadir una alerta de Estás seguro de que no quieres guardar?
    this.router.navigateByUrl('/atoridashboard');
  }
}
