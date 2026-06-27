import { Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent implements OnInit {

  private metaService = inject(Meta);

  ngOnInit(): void {
    // 💡 El Título se maneja dinámicamente desde app.routes.ts

    // Meta descripción para informar al usuario sobre la protección de datos
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce cómo Hormigones del Sur S.A.S. protege y gestiona tus datos personales. Transparencia y cumplimiento normativo en Pitalito, Huila.'
    });

    // Etiquetas Open Graph para profesionalismo
    this.metaService.updateTag({ property: 'og:title', content: 'Política de Privacidad - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Tu privacidad es nuestra prioridad. Consulta nuestros términos sobre el tratamiento de información.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/politica-privacidad' });
  }

}
