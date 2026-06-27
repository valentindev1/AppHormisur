import { Component } from '@angular/core';
import {ContactoService} from './service/form-contacto.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-form-contacto',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-contacto.component.html',styleUrls: ['./form-contacto.component.css']
})
export class FormContactoComponent {

  formData = {
    nombre: '',
    telefono: '',
    correo: '',
    descripcion: ''
  };

  constructor(private contactoService: ContactoService) {}

  enviarFormulario() {
    this.contactoService.enviar(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        alert('Solicitud enviada correctamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al enviar');
      }
    });
  }
}
