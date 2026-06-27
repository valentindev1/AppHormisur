import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRequest } from '../../models/usuario-request.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  usuario: UsuarioRequest = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  };

  mensaje: string = '';

  constructor(private usuarioService: UsuarioService) {}

  crearUsuario() {
    this.usuarioService.crear(this.usuario).subscribe({
      next: (res) => {
        this.mensaje = '✅ Usuario creado correctamente';
        console.log(res);

        // limpiar formulario
        this.usuario = {
          nombre: '',
          apellido: '',
          email: '',
          password: ''
        };
      },
      error: (err) => {
        this.mensaje = '❌ Error: ' + err.error;
      }
    });
  }
}
