import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-prefabricados',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './prefabricados.component.html',
  styleUrl: './prefabricados.component.css'
})
export class PrefabricadosComponent implements OnInit {

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    // El Título se maneja dinámicamente desde app.routes.ts

    // Descripción enfocada en la solución constructiva
    this.metaService.updateTag({
      name: 'description',
      content: 'Soluciones en concreto prefabricado con altos estándares de calidad. Optimizamos tiempos y costos en tu obra con elementos durables para diversos proyectos en Pitalito y el Huila.'
    });

    // Palabras clave estratégicas para este nicho
    this.metaService.updateTag({
      name: 'keywords',
      content: 'prefabricados de concreto, elementos prefabricados, concreto arquitectonico, construccion eficiente, pitalito, hormigones del sur, huila'
    });

    // Etiquetas Open Graph (WhatsApp/Redes)
    this.metaService.updateTag({ property: 'og:title', content: 'Prefabricados de Concreto - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Descubre nuestra línea de prefabricados: diseño, resistencia y rapidez para tus proyectos de construcción.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/prefabricados' });
  }

}
