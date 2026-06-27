import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticuloService } from '../../modules/articulos/services/articulo.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-articulo-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './articulo-carousel.component.html',
  styleUrl: './articulo-carousel.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ArticuloCarouselComponent implements OnInit, OnDestroy {

  @Input() categoria: string = '';
  @Input() limite: number = 6;

  @ViewChild('carrusel') carrusel!: ElementRef<HTMLDivElement>;

  articulosFiltrados: any[] = [];
  private interval: any;
  private intervalRecarga: any;

  constructor(
    private articuloService: ArticuloService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ✅ helper imagen
  getImagen(url?: string): string {
    return url
      ? `${environment.apiUrl}${url}`
      : 'assets/img/news-placeholder.jpg';
  }

  // ✅ INIT
  ngOnInit() {
    this.cargarArticulos();
    this.iniciarAutoScroll();

    // ✅ recarga cada 10s (evita que se quede pegado)
    this.intervalRecarga = setInterval(() => {
      this.cargarArticulos();
    }, 10000);
  }

  // ✅ ORDEN + LIMITE + SIN CACHE
  cargarArticulos() {

    const categoriaSinCache = `${this.categoria}?t=${Date.now()}`;

    this.articuloService.listarPorCategoria(categoriaSinCache)
      .subscribe((data: any[]) => {

        console.log('DATA REAL BACKEND:', data);

        // ✅ IMPORTANTE: copiar array (evita bugs de referencia)
        const copia = [...data];

        // ✅ ORDENAR (MAS RECIENTES PRIMERO)
        const ordenados = copia.sort((a, b) => b.id - a.id);


        // ✅ APLICAR LIMITE CORRECTAMENTE
        this.articulosFiltrados = ordenados.slice(0, this.limite);

        console.log('ARTICULOS MOSTRADOS:', this.articulosFiltrados);

      });
  }

  // ✅ AUTOSCROLL
  iniciarAutoScroll() {

    if (!isPlatformBrowser(this.platformId)) return;

    this.interval = setInterval(() => {

      if (!this.carrusel?.nativeElement) return;

      const contenedor = this.carrusel.nativeElement;

      if (contenedor.scrollLeft + contenedor.offsetWidth >= contenedor.scrollWidth) {
        contenedor.scrollLeft = 0;
      } else {
        contenedor.scrollBy({
          left: 350,
          behavior: 'smooth'
        });
      }

    }, 3000);
  }

  // ✅ CLEAN
  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
    if (this.intervalRecarga) clearInterval(this.intervalRecarga);
  }
}
