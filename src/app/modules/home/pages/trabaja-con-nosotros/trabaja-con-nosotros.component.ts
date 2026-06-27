import { Component, OnInit, inject } from '@angular/core'; // ✅ Añadimos inject
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Meta } from '@angular/platform-browser'; // ✅ Importamos Meta

@Component({
  selector: 'app-trabaja-con-nosotros',
  templateUrl: './trabaja-con-nosotros.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./trabaja-con-nosotros.component.css']
})
export class TrabajaConNosotrosComponent implements OnInit {
  formularioTrabajo!: FormGroup;
  archivoAdjunto: File | null = null;
  enviando = false;
  mensajeExito = false;

  // ✅ Inyección moderna
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private metaService = inject(Meta); // Inyectamos Meta

  ngOnInit(): void {
    this.configurarSEO();

    this.formularioTrabajo = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  // ✅ Configuración SEO específica para esta página
  configurarSEO(): void {
    this.metaService.updateTag({
      name: 'description',
      content: '¿Quieres trabajar con nosotros? Únete al equipo de Hormigones del Sur en Pitalito. Envía tu hoja de vida y forma parte de la mejor empresa concretera del Huila.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'trabajo, empleo, vacantes pitalito, trabajar en construccion, hormigones del sur, oportunidades laborales huila, enviar hoja de vida'
    });

    // Etiquetas Open Graph (Para cuando compartas el link en redes sociales)
    this.metaService.updateTag({ property: 'og:title', content: 'Trabaja con Nosotros - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: '¡Estamos creciendo! Envía tus datos y tu hoja de vida para futuras vacantes en nuestra planta de Pitalito.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/trabaja-con-nosotros' });
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.archivoAdjunto = file;
    }
  }

  enviarHojaDeVida(): void {
    if (this.formularioTrabajo.invalid || !this.archivoAdjunto) {
      this.formularioTrabajo.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.mensajeExito = false;

    const formData = new FormData();
    formData.append('nombres', this.formularioTrabajo.value.nombres);
    formData.append('apellidos', this.formularioTrabajo.value.apellidos);
    formData.append('telefono', this.formularioTrabajo.value.telefono);
    formData.append('correo', this.formularioTrabajo.value.correo);
    formData.append('mensaje', this.formularioTrabajo.value.mensaje);
    formData.append('cv', this.archivoAdjunto as Blob, this.archivoAdjunto!.name);

    this.http.post('http://localhost:8080/api/contacto/trabaja-con-nosotros', formData)
      .subscribe({
        next: () => {
          this.enviando = false;
          this.mensajeExito = true;
          this.formularioTrabajo.reset();
          this.archivoAdjunto = null;
        },
        error: (error) => {
          this.enviando = false;
          alert('Error: ' + (error.error?.message || 'No se pudo enviar la solicitud'));
        }
      });
  }
}
