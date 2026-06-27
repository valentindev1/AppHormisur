import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Asegúrate de que las rutas hacia tus servicios sean correctas según tu estructura
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { ArticuloService } from '../../../articulos/services/articulo.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {







  // Usamos inject() para inyectar los servicios de forma moderna
  private categoriaService = inject(CategoriaService);
  private articuloService = inject(ArticuloService);
  private metaService = inject(Meta);

  totalCategorias: number = 0;
  totalArticulos: number = 0;

  ngOnInit(): void {
    this.cargarDatosDashboard();
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  cargarDatosDashboard() {
    // Aquí cargamos la información que se mostrará en los widgets
    this.categoriaService.listar().subscribe({
      next: (data) => this.totalCategorias = data.length,
      error: (err) => console.error('Error cargando categorías', err)
    });

    this.articuloService.listar().subscribe({
      next: (data) => this.totalArticulos = data.length,
      error: (err) => console.error('Error cargando artículos', err)
    });
  }
}
