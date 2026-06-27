import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage,
    RouterModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  private metaService = inject(Meta);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {

    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // 5. Ejecutamos la petición
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso', res);
          // Redirigimos al admin tras login
          this.router.navigate(['/admin']);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.isLoading = false;
          alert('Credenciales incorrectas');
        }
      });
    } else {
      // Marcamos los campos como tocados para mostrar errores visuales
      this.loginForm.markAllAsTouched();
    }
  }
}
