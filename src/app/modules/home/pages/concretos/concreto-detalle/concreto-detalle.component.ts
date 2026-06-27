import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConcretoService } from '../services/ConcretoService';
import { ConcretoDetalle } from '../models/ConcretoDetalle';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-concreto-detalle',
  templateUrl: './concreto-detalle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  styleUrls: ['./concreto-detalle.component.css']
})
export class ConcretoDetalleComponent implements OnInit {

  productoActivo: ConcretoDetalle | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private concretoService: ConcretoService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  // ✅ FORZADO TOTAL: Silenciado antes de reproducir
  @ViewChild('videoShowcase') set videoElement(element: ElementRef<HTMLVideoElement> | undefined) {
    if (element && element.nativeElement) {
      const video = element.nativeElement;

      // Aplicamos doble protección: atributo mute y volumen en 0
      video.muted = true;
      video.volume = 0;

      // Intentamos reproducir con un pequeño delay para asegurar carga
      setTimeout(() => {
        video.play().catch(error => {
          console.warn("Autoplay bloqueado por el navegador (normal en primera visita):", error);
        });
      }, 200);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idConcreto = params.get('tipo');
      if (idConcreto) {
        this.productoActivo = this.concretoService.obtenerConcretoPorId(idConcreto);
        if (this.productoActivo) {
          this.aplicarSEO(this.productoActivo);
        } else {
          this.router.navigate(['/concretos']);
        }
      }
    });
  }

  aplicarSEO(concreto: ConcretoDetalle) {
    // Título de la pestaña
    this.titleService.setTitle(`Ficha Técnica: ${concreto.titulo} | Hormigones Del Sur`);

    // Descripción para Google
    this.metaService.updateTag({
      name: 'description',
      content: `${concreto.subtitulo}. ${concreto.descripcionLarga.substring(0, 90)}... Despachos desde Pitalito, Huila.`
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: `${concreto.titulo.toLowerCase()}, ${concreto.id}, concreto premezclado, construcción, pitalito, huila`
    });

    // Etiquetas Open Graph (Redes sociales y WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: `${concreto.titulo} - Calidad y Resistencia` });
    this.metaService.updateTag({ property: 'og:description', content: concreto.subtitulo });
    this.metaService.updateTag({ property: 'og:image', content: `https://hormisursas.com.co/${concreto.imagenHero}` });
    this.metaService.updateTag({ property: 'og:url', content: `https://hormisursas.com.co/concreto/${concreto.id}` });
  }
}
