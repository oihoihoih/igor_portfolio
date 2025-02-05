import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dash-add-project',
    templateUrl: './dash-add-project.component.html',
    styleUrl: './dash-add-project.component.css',
    standalone: false
})
export class DashAddProjectComponent {
  public addProjectForm!: FormGroup;
  public selectedFile: File | null = null;
  public selectedFileUrl: string | ArrayBuffer | null = null;
  public dialogIsOpen: boolean = false;
  public dialogMessageH2: string = '';
  public dialogP: string = '';
  public btnOk: string = '';
  public btnCancel: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dashService: DashService,
    private router: Router
  ) {
    this.createForm();
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

  //  TODO: Añadir un validador para las url
  createForm() {
    this.addProjectForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      year: ['', [Validators.required]],
      director: ['', [Validators.required]],
      dop: ['', [Validators.required]],
      category: ['', [Validators.required]],
      trailerUrl: [''],
    });
  }

  onSubmit() {
    if (this.addProjectForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile as File);
    formData.append('title', this.addProjectForm.get('title')?.value);
    formData.append('year', this.addProjectForm.get('year')?.value);
    formData.append('director', this.addProjectForm.get('director')?.value);
    formData.append('dop', this.addProjectForm.get('dop')?.value);
    formData.append('category', this.addProjectForm.get('category')?.value);
    formData.append('trailerUrl', this.addProjectForm.get('trailerUrl')?.value);

    this.dashService.uploadFile(formData).subscribe({
      next: () => {
        this.openDialog();
      },
      error: (error) => {
        console.error('Error al subir el archivo', error);
      },
    });
  }

  cancel() {
    this.dialogIsOpen = true;

    this.dialogMessageH2 = '¿Estás seguro?';
    this.dialogP = 'Si cancelas, los datos introducidos no se guardarán';
    this.btnOk = 'Cancelar'.toUpperCase();
    this.btnCancel = 'Volver';
  }

  hideModal(): void {
    this.dialogIsOpen = false;
  }

  dontSave() {
    this.dialogIsOpen = false;
    this.router.navigateByUrl('/atoridashboard');
  }

  openDialog() {
    setTimeout(() => {
      this.dialogIsOpen = true;
      this.dialogMessageH2 = '¡Proyecto guardado!';
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
