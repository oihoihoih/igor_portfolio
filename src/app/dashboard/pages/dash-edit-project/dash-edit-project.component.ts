import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-dash-edit-project',
  templateUrl: './dash-edit-project.component.html',
  styleUrl: './dash-edit-project.component.css',
  standalone: false,
})
export class DashEditProjectComponent {
  public editProjectForm!: FormGroup;
  private _id: string = '';
  public project!: Project;
  public selectedFileUrl: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;
  public defaultImageUrl: string = './assets/images/dummy-project.jpg'; // Ruta de la imagen dummy
  public dialogIsOpen: boolean = false;
  public dialogMessageH2: string = '';
  public dialogP: string = '';
  public btnOk: string = '';
  public btnCancel: string = '';

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

        // Asegurarte de usar la URL completa del backend para acceder a la imagen
        const backendUrl = 'http://localhost:3000';

        this.selectedFileUrl = `${backendUrl}${this.project.img}`;
        if (!this.selectedFileUrl) {
          console.log('no hay imagen ');
        } else {
          console.log('hay imagen, ', this.selectedFileUrl);
        }

        this.editForm();
      },
      error: (error) => {
        console.error('Error fetching project:', error);
        this.router.navigateByUrl('/atoridashboard');
      },
    });
  }

  // SELECT FILE
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  editForm() {
    this.editProjectForm = this.formBuilder.group({
      title: [this.project.title || '', [Validators.required]],
      year: [this.project.year || '', [Validators.required]],
      director: [this.project.director || '', [Validators.required]],
      dop: [this.project.dop || '', [Validators.required]],
      category: [this.project.category || '', [Validators.required]],
      trailerUrl: [this.project.trailerUrl || '', [Validators.required]],
    });
  }

  onSubmit() {
    // Crear un FormData para enviar el formulario con la imagen
    const formData = new FormData();

    // Añadir los campos del formulario al FormData
    formData.append('title', this.editProjectForm.get('title')?.value);
    formData.append(
      'year',
      String(Number(this.editProjectForm.get('year')?.value))
    ); // Convertir a número
    formData.append('director', this.editProjectForm.get('director')?.value);
    formData.append('dop', this.editProjectForm.get('dop')?.value);
    formData.append('category', this.editProjectForm.get('category')?.value);
    formData.append(
      'trailerUrl',
      this.editProjectForm.get('trailerUrl')?.value
    );

    // Añadir la imagen al FormData si se ha seleccionado una
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    // Debug: imprimir los datos del formData
    for (let pair of (formData as any).entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    if (this.editProjectForm.valid) {
      this.dashService.editProject(this.project._id, formData).subscribe({
        next: () => {
          this.openDialog();
        },
        error: (error) => {
          console.log({ error });
        },
      });
    } else {
      console.log('Formulario inválido. Por favor, revisa los campos.');
    }
  }

  cancelSubmit() {
    this.dialogIsOpen = true;
    this.dialogMessageH2 = '¿Estás seguro?';
    this.dialogP = 'Si cancelas, los cambios no se guardarán';
    this.btnOk = 'Cancelar'.toUpperCase();
    this.btnCancel = 'Volver';
  }

  dontSave() {
    this.dialogIsOpen = false;
    this.router.navigateByUrl('/atoridashboard');
  }

  hideModal(): void {
    this.dialogIsOpen = false;
  }

  openDialog() {
    setTimeout(() => {
      this.dialogIsOpen = true;
      this.dialogMessageH2 = 'Cambios guardados!';
      this.dialogP = 'Tu proyecto se ha guardado correctamente';
      this.btnOk = '';
      this.btnCancel = '';
    }, 500);

    setTimeout(() => {
      this.dialogIsOpen = false;
      this.router.navigateByUrl('/atoridashboard');
    }, 3000);
  }
}
