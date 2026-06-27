
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {environment} from '../../../../../environment/environment';

@Component({
  selector: 'app-ver-articulo',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './ver-articulo.component.html',
  styleUrls: ['./ver-articulo.component.css']
})
export class VerArticuloComponent implements OnInit {

  articulo: any;

  constructor(
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}







  ngOnInit(): void {

    const categoria = this.route.snapshot.paramMap.get('categoria');
    const slug = this.route.snapshot.paramMap.get('slug');






    if (categoria && slug) {
      this.articuloService.obtenerPorCategoriaSlug(categoria, slug)
        .subscribe({
          next: (res) => {
            this.articulo = res;

            // ✅ DATOS SEO
            const titulo = res.titulo;

            const descripcion = res.resumen ||
              res.contenido?.substring(0, 150) ||
              'Noticias de Hormigones del Sur';












            const imagen = res.imagenes?.length
              ? `${environment.apiUrl}${res.imagenes[0]}`
              : 'https://hormisursas.com.co/assets/default.jpg';












            const url = `https://hormisursas.com.co/${res.categoria}/${res.slug}`;

            // ✅ TITLE
            this.titleService.setTitle(`${titulo} | Hormigones del Sur S.A.S`);

            // ✅ META BÁSICO
            this.metaService.updateTag({ name: 'description', content: descripcion });

            // ✅ OPEN GRAPH (WhatsApp, Facebook)
            this.metaService.updateTag({ property: 'og:title', content: titulo });
            this.metaService.updateTag({ property: 'og:description', content: descripcion });
            this.metaService.updateTag({ property: 'og:image', content: imagen });
            this.metaService.updateTag({ property: 'og:url', content: url });
            this.metaService.updateTag({ property: 'og:type', content: 'article' });

            // ✅ TWITTER
            this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
            this.metaService.updateTag({ name: 'twitter:title', content: titulo });
            this.metaService.updateTag({ name: 'twitter:description', content: descripcion });
            this.metaService.updateTag({ name: 'twitter:image', content: imagen });

            // ✅ JSON-LD (SOLO EN NAVEGADOR)
            if (isPlatformBrowser(this.platformId)) {
              const script = document.createElement('script');
              script.type = 'application/ld+json';
              script.text = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": titulo,
                "description": descripcion,
                "image": [imagen],
                "mainEntityOfPage": url,
                "author": {
                  "@type": "Organization",
                  "name": "Hormigones del Sur"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Hormigones del Sur",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://hormisursas.com.co/assets/logo.png"
                  }
                }
              });
              document.head.appendChild(script);
            }

          },
          error: (err) => console.error(err)
        });
    }

  }




  getImagen(url: string): string {
    return `${environment.apiUrl}${url}`;
  }

}
