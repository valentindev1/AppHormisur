import { Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent implements OnInit {

  private metaService = inject(Meta);

  ngOnInit(): void {
    // 💡 El Título se maneja dinámicamente desde app.routes.ts

    // Meta descripción para dar seguridad jurídica al usuario
    this.metaService.updateTag({
      name: 'description',
      content: 'Consulta los términos y condiciones de uso de nuestro sitio web y servicios. Hormigones del Sur S.A.S. garantiza claridad y transparencia en Pitalito, Huila.'
    });

    // Etiquetas Open Graph
    this.metaService.updateTag({ property: 'og:title', content: 'Términos y Condiciones - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Conoce las condiciones legales que rigen el uso de nuestra plataforma y servicios.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/terminos-condiciones' });
  }

}
