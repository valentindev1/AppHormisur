import { Component, OnInit } from '@angular/core';
import { ArticuloResponse } from '../../../articulos/models/articulo-response.model';
import { ArticuloService } from '../../../articulos/services/articulo.service';
import { RouterLink } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import {environment} from '../../../../../environment/environment';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  articulos: ArticuloResponse[] = [];
  articulosVisibles: ArticuloResponse[] = [];
  cargando: boolean = true;

  limite = 9; //  cantidad inicial
  incremento = 9; //  cuantos cargar después



  // ✅ Inyectamos Meta en el constructor
  constructor(
    private articuloService: ArticuloService,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.configurarSEO();
    this.cargarArticulos();
  }

  //  METODO SEO: Fijo para la página principal del blog
  configurarSEO(): void {


    this.metaService.updateTag({
      name: 'description',
      content: 'Mantente informado con las últimas noticias, novedades, consejos y proyectos del sector constructor de Hormigones del Sur en Pitalito, Huila.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'noticias construccion, blog hormigones del sur, novedades concretera, proyectos pitalito, actualidad huila, obras'
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Noticias y Novedades - Hormigones del Sur S.A.S.' });
    this.metaService.updateTag({ property: 'og:description', content: 'Explora nuestros últimos artículos, consejos de construcción y actualizaciones de proyectos en la región.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://hormisursas.com.co/assets/img/LOGO.png' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://hormisursas.com.co/noticias' });
  }

  cargarArticulos(): void {
    this.articuloService.listar().subscribe({
      next: (data) => {
        const publicados = data
          .filter(a => a.publicada)
          .sort((a, b) => b.id - a.id);

        this.articulos = publicados;

        // ✅ SOLO MOSTRAR LOS PRIMEROS 9
        this.articulosVisibles = this.articulos.slice(0, this.limite);

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.cargando = false;
      }
    });
  }

  verMas(): void {
    this.limite += this.incremento;
    this.articulosVisibles = this.articulos.slice(0, this.limite);
  }

  //  obtener primera imagen o fallback

  getImagen(articulo: ArticuloResponse): string {
    if (articulo.imagenes && articulo.imagenes.length > 0) {
      return `${environment.apiUrl}${articulo.imagenes[0]}`;
    }
    return 'assets/img/default.jpg';
  }

}
