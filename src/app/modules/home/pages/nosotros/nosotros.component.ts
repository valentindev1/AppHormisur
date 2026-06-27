import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit {

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    // 💡 El Título de la pestaña se maneja dinámicamente desde app.routes.ts

    // Descripción corporativa para los resultados de Google
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce la trayectoria, misión y valores de Hormigones del Sur S.A.S. Somos una empresa líder en la producción de concreto certificado y prefabricados en Pitalito, Huila.'
    });

    // Palabras clave enfocadas en la identidad institucional
    this.metaService.updateTag({
      name: 'keywords',
      content: 'nosotros hormigones del sur, empresa concretera pitalito, historia, mision, vision, concreto certificado huila, trayectoria construccion'
    });

    // Etiquetas Open Graph (Ideales para compartir el perfil de la empresa en LinkedIn o WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: 'Sobre Nosotros - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Construimos el futuro de la región con bases sólidas. Descubre nuestra historia, nuestro equipo y el compromiso con la calidad en cada proyecto.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/nosotros' });
  }

}
