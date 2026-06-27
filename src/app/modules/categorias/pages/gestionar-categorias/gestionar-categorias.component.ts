import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-gestionar-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-categorias.component.html'
})
export class GestionarCategoriasComponent implements OnInit {

  categorias: Categoria[] = [];

  nuevaCategoria = {
    nombre: '',
    descripcion: ''
  };

  mensaje: string = '';

  constructor(private categoriaService: CategoriaService,private metaService: Meta) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.metaService.updateTag({name: 'robots', content: 'noindex, nofollow'});
  }

  // ✅ cargar categorías
  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: res => this.categorias = res,
      error: err => console.error(err)
    });
  }

  // ✅ crear categoría
  crearCategoria() {

    this.categoriaService.crear(this.nuevaCategoria).subscribe({
      next: res => {

        this.mensaje = '✅ Categoría creada correctamente';

        this.nuevaCategoria = {
          nombre: '',
          descripcion: ''
        };

        this.cargarCategorias();
      },
      error: err => {
        console.error(err);
        this.mensaje = '❌ Error al crear categoría';
      }
    });
  }

  // ✅ eliminar categoría
  eliminarCategoria(id: number) {

    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;

    this.categoriaService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = '✅ Categoría eliminada';
        this.cargarCategorias();
      },
      error: err => {
        console.error(err);
        this.mensaje = '❌ Error al eliminar';
      }
    });
  }
}
