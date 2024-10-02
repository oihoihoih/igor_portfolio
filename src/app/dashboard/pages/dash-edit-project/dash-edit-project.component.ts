import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../../model/project';

@Component({
  selector: 'app-dash-edit-project',
  templateUrl: './dash-edit-project.component.html',
  styleUrl: './dash-edit-project.component.css',
})
export class DashEditProjectComponent {
  public editProjectForm!: FormGroup;
  private _id: string = '';
  public project!: Project;

  constructor(
    private formBuilder: FormBuilder,
    private dashService: DashService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._id = this.route.snapshot.params['id'];

    this.dashService.getProjectById(this._id).subscribe({
      next: (project: Project) => {
        if (!project) {
          this.router.navigateByUrl('/atoridashboard');
          return;
        }
        this.project = project;
        this.editForm();
      },
      error: (error) => {
        console.error('Error fetching project:', error);
        this.router.navigateByUrl('/atoridashboard');
      },
    });
  }

  editForm() {
    this.editProjectForm = this.formBuilder.group({
      title: [this.project.title, [Validators.required]],
      year: [this.project.year, [Validators.required]],
      director: [this.project.director, [Validators.required]],
      dop: [this.project.dop, [Validators.required]],
      category: [this.project.category, [Validators.required]],
      img: [this.project.img, [Validators.required]],
      trailerUrl: [this.project.trailerUrl, [Validators.required]],
    });
  }

  onSubmit() {
    this.dashService
      .editProject(this.project._id, this.editProjectForm.value)
      .subscribe({
        next: () => {
          console.log('Proyecto editado');
          this.router.navigateByUrl('/atoridashboard');
        },
        error: (error) => {
          console.log({ error });
        },
      });
  }

  cancelSubmit() {
    // TODO: Añadir una alerta de tipo estás seguro de que no quieres guardar?
    this.router.navigateByUrl('/atoridashboard');
  }
}
