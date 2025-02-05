import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators from '@angular/forms'
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: false
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        'hola@oihoih.es',
        { validators: [Validators.required, Validators.email] },
      ],
      password: [
        'Aceituna1',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/atoridashboard'),
      error: (error) => {
        // TODO: Mirar si se puede manejar el error de otra manera, para que la tipografía quede más acorde con el estilo de la aplicación
        Swal.fire({
          title: 'Oooops!',
          text: 'Ha ocurrido un error con el login. El usuario o la contraseña son incorrectos',
          icon: 'error',
        });
        console.log({ loginError: error });
      },
    });
  }
}
