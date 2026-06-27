import { Component, OnInit, inject } from '@angular/core'; // ✅ Usamos inject para consistencia
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser'; // ✅ Importamos Meta

import { ArticuloService } from '../../../articulos/services/articulo.service';
import { ArticuloResponse } from '../../../articulos/models/articulo-response.model';
import {environment} from '../../../../../environment/environment';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: ArticuloResponse[] = [];
  loading: boolean = true;

  // ✅ Inyección moderna
  private articuloService = inject(ArticuloService);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.configurarSEO();
    this.cargarProyectos();
  }




  getImagen(url: string): string {
    return `${environment.apiUrl}${url}`;
  }



  configurarSEO(): void {
    // Descripción enfocada en mostrar capacidad técnica y experiencia
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce nuestro portafolio de proyectos constructivos realizados por Hormigones del Sur. Ingeniería de calidad y soluciones en concreto para el desarrollo de Pitalito y el Huila.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'proyectos hormigones del sur, portafolio construccion, obras pitalito, ingenieria civil huila, concretera, experiencia constructora'
    });

    // Etiquetas Open Graph (WhatsApp/Redes)
    this.metaService.updateTag({ property: 'og:title', content: 'Nuestros Proyectos - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Descubre las obras que hemos construido con calidad, resistencia y compromiso en todo el departamento del Huila.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/proyectos' });
  }





  cargarProyectos(): void {
    this.articuloService.listarPorCategoria('proyectos').subscribe({
      next: (data) => {
        this.proyectos = data.sort((a, b) => b.id - a.id);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
