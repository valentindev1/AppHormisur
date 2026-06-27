import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // Título de la pestaña

    // Descripción para Google (Enfocada en búsqueda local en Pitalito)
    this.metaService.updateTag({
      name: 'description',
      content: 'Comunícate con Hormigones del Sur en Pitalito, Huila. Directorio corporativo, líneas de atención para cotizar tu proyecto.'
    });

    // Palabras clave transaccionales
    this.metaService.updateTag({
      name: 'keywords',
      content: 'contacto hormigones del sur, telefono concretera pitalito, ubicacion, cotizar concreto huila, atencion al cliente'
    });

    // Etiquetas Open Graph (Para cuando compartas el link de contacto por WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: 'Contacto - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: '¿Tienes un proyecto en mente? Escríbenos o llámanos para cotizar tu concreto premezclado, prefabricados o alquiler de maquinaria.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/contacto' });
  }

}
