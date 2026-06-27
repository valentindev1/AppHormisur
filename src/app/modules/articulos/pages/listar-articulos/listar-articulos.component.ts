import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ArticuloService } from '../../services/articulo.service';
import { ArticuloResponse } from '../../models/articulo-response.model';
import {Meta} from '@angular/platform-browser';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-listar-articulos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit {

  articulos: ArticuloResponse[] = [];

  constructor(private articuloService: ArticuloService, private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'robots', content: 'noindex, nofollow'});
    this.cargarArticulos();
  }

  //  CARGAR LISTA
  cargarArticulos() {
    this.articuloService.listar().subscribe({
      next: (res) => {
        this.articulos = res;
      },
      error: (err) => {
        console.error('Error cargando artículos', err);
      }
    });
  }



  getImagen(url: string) {
    return `${environment.apiUrl}${url}`;
  }



  //  ELIMINAR
  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este artículo?')) return;

    this.articuloService.eliminar(id).subscribe({
      next: () => {
        console.log('Artículo eliminado');
        this.cargarArticulos(); // recarga tabla
      },
      error: (err) => {
        console.error('Error eliminando', err);
      }
    });
  }

  //  SLUG CATEGORÍA
  getSlugCategoria(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-');
  }

}
