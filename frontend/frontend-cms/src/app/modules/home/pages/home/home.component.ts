import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticuloService } from '../../../articulos/services/articulo.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { ArticuloCarouselComponent } from '../../../../components/articulo-carousel/articulo-carousel.component';
import { Meta } from '@angular/platform-browser';
import {environment} from '../../../../../environment/environment';
import {FormContactoComponent} from '../../../../components/form-contacto/form-contacto.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, ArticuloCarouselComponent, FormContactoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ultimasNoticias: any[] = [];
  categorias: any[] = [];

  @ViewChild('carruselNoticias') carrusel!: ElementRef;
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    private articuloService: ArticuloService,
    private categoriaService: CategoriaService,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  //  VIDEO PRINCIPAL
  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

    if (this.bgVideo?.nativeElement) {
      this.bgVideo.nativeElement.muted = true;

      this.bgVideo.nativeElement.play()?.catch(error => {
        console.error('Autoplay bloqueado:', error);
      });
    }
  }


  getImagen(url: string): string {
    return `${environment.apiUrl}${url}`;
  }




  //  VIDEO NOSOTROS
  @ViewChild('videoNosotros') set configurarVideo(element: ElementRef<HTMLVideoElement>) {

    if (!isPlatformBrowser(this.platformId)) return;

    if (element?.nativeElement) {

      element.nativeElement.muted = true;

      setTimeout(() => {
        element.nativeElement.play()?.catch(error => {
          console.error("Autoplay bloqueado en Nosotros:", error);
        });
      }, 100);
    }
  }

  //  INIT
  ngOnInit(): void {

    this.cargarCategorias();
    this.cargarUltimasNoticias();

    //  SEO META
    this.metaService.updateTag({
      name: 'description',
      content: 'Concretera Hormigones del Sur S.A.S. en Pitalito, Huila. Mezclas de alta resistencia y prefabricados.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'concreto, huila, concretera, prefabricados, maquinaria'
    });

    this.metaService.updateTag({ property: 'og:title', content: 'Hormigones del Sur SAS' });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Soluciones en concreto certificado en el sur del Huila.'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://hormisursas.com.co/assets/img/LOGO.png'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://hormisursas.com.co'
    });
  }

  //  VALORES
  valoresEmpresa = [
    { titulo: 'Durabilidad', icono: 'bi-shield-check', img: 'assets/img/v1/1.jpg' },
    { titulo: 'Calidad', icono: 'bi-patch-check', img: 'assets/img/v1/2.jpg' },
    { titulo: 'Experiencia', icono: 'bi-briefcase', img: 'assets/img/v1/3.jpg' },
    { titulo: 'Talento Humano', icono: 'bi-people', img: 'assets/img/v1/4.jpg' },
    { titulo: 'Seguridad', icono: 'bi-cone-striped', img: 'assets/img/v1/5.jpg' },
    { titulo: 'Asesoramiento', icono: 'bi-chat-dots', img: 'assets/img/v1/6.jpg' }
  ];

  //  CARGAS
  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: res => (this.categorias = res),
      error: err => console.error('Error categorías', err)
    });
  }

  cargarUltimasNoticias() {
    this.articuloService.listar().subscribe({
      next: (articulos) => {
        this.ultimasNoticias = articulos
          .filter((a: any) => a.publicada)
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 5);
      },
      error: err => console.error('Error noticias', err)
    });
  }

  obtenerNombreCategoria(id: number): string {
    if (!this.categorias.length) return '...';
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'NOTICIA';
  }

  //  CARRUSEL
  moverCarrusel(direccion: number) {

    if (!isPlatformBrowser(this.platformId)) return;

    if (this.carrusel?.nativeElement) {

      const cantidadScroll = 380 * direccion;

      this.carrusel.nativeElement.scrollBy({
        left: cantidadScroll,
        behavior: 'smooth'
      });
    }
  }
}
