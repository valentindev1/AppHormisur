import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-maquinaria',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './maquinaria.component.html',
  styleUrl: './maquinaria.component.css'
})
export class MaquinariaComponent implements OnInit {

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    // 💡 El Título de la pestaña se maneja dinámicamente desde app.routes.ts

    // Descripción para Google (Enfocada en el servicio y la zona geográfica)
    this.metaService.updateTag({
      name: 'description',
      content: 'Servicio de alquiler de maquinaria para construcción. Contamos con camiones mixer, bombas estacionarias y equipos especializados para tu obra en Pitalito y el sur del Huila.'
    });

    // Palabras clave específicas del nicho de maquinaria
    this.metaService.updateTag({
      name: 'keywords',
      content: 'alquiler maquinaria pesada, camiones mixer, bomba de concreto, construccion, pitalito, huila, hormigones del sur'
    });

    // Etiquetas Open Graph (Para compartir en redes y chats)
    this.metaService.updateTag({ property: 'og:title', content: 'Servicio de Maquinaria - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Optimiza los tiempos de tu obra con nuestro servicio de maquinaria especializada. Camiones mixer y bombas de concreto a tu disposición.' });

    // Si más adelante tienes una buena foto de un camión mixer en assets, puedes cambiar la ruta de esta imagen
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/maquinaria' });
  }

}
