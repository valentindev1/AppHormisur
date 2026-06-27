import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {ArticuloService} from '../../services/articulo.service';
import {CategoriaService} from '../../../categorias/services/categoria.service';

import {ArticuloRequest} from '../../models/articulo-request.model';
import {Categoria} from '../../../categorias/models/categoria.model';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import {AuthService} from '../../../../core/services/auth.service';
import {Meta} from '@angular/platform-browser';
import {environment} from '../../../../../environment/environment';

@Component({
  selector: 'app-crear-articulo',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './crear-articulo.component.html'
})
export class CrearArticuloComponent implements OnInit {

  //  MODELO
  articulo: ArticuloRequest = {
    titulo: '',
    contenido: '',
    resumen: '',
    categoriaId: 0,
    publicada: true,
    imagenes: []
  };

  categorias: Categoria[] = [];
  previewUrls: string[] = [];

  mensaje: string = '';


  id!: number;
  modoEditar: boolean = false;

  constructor(
    private articuloService: ArticuloService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,private metaService: Meta
  ) {
  }

  // =========================
  //  INIT
  // =========================
  ngOnInit(): void {
    this.metaService.updateTag({name: 'robots', content: 'noindex, nofollow'});
    this.cargarCategorias();

    //  DETECTAR SI ES EDICIÓN
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
      this.modoEditar = true;

      this.cargarArticulo(this.id);
    }
  }

  // =========================
  //  CARGAR ARTICULO (EDITAR)
  // =========================
  cargarArticulo(id: number) {
    this.articuloService.obtenerPorId(id).subscribe({
      next: (data) => {

        console.log('Artículo cargado:', data);

        this.articulo = {
          titulo: data.titulo,
          contenido: data.contenido,
          resumen: data.resumen,
          categoriaId: data.categoriaId,
          publicada: data.publicada,
          imagenes: [] //  las imágenes no se cargan como File
        };

        //  opcional preview existente
        if (data.imagenes && data.imagenes.length > 0) {

          this.previewUrls = data.imagenes.map(
            (img: string) => `${environment.apiUrl}${img}`
          );

        }

      },
      error: err => console.error('Error cargando artículo', err)
    });
  }

  // =========================
  //  CATEGORIAS
  // =========================
  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: res => {
        this.categorias = res;

        if (!this.modoEditar && res.length > 0) {
          this.articulo.categoriaId = res[0].id;
        }
      },
      error: err => console.error(err)
    });
  }

  // =========================
  //  MANEJO IMAGENES
  // =========================
  onFileChange(event: any) {

    const files = Array.from(event.target.files) as File[];

    this.previewUrls = [];
    this.articulo.imagenes = [];

    files.forEach(file => {

      if (file.size > 10 * 1024 * 1024) {
        this.mensaje = `❌ ${file.name} supera el límite`;
        return;
      }

      this.articulo.imagenes.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // =========================
  //  GUARDAR (CREAR O EDITAR)
  // =========================
  guardarArticulo() {
    const formData = new FormData();
    formData.append('titulo', this.articulo.titulo);
    formData.append('contenido', this.articulo.contenido);
    formData.append('resumen', this.articulo.resumen);
    formData.append('categoriaId', this.articulo.categoriaId.toString());
    formData.append('publicada', this.articulo.publicada.toString());

    this.articulo.imagenes.forEach(file => {
      formData.append('imagenes', file);
    });

    // Configuración explícita sin causar conflictos de tipo
    const alertaExito: SweetAlertOptions = {
      icon: 'success',
      title: '¡Éxito!',
      text: this.modoEditar ? 'Artículo actualizado correctamente' : 'Artículo creado correctamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd'
    };

    if (this.modoEditar) {
      this.articuloService.actualizar(this.id, formData).subscribe({
        next: () => {
          Swal.fire(alertaExito).then(() => {
            this.router.navigate(['/admin/articulos']);
          });
        },
        error: err => {
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar' });
        }
      });
    } else {
      this.articuloService.crear(formData).subscribe({
        next: () => {
          Swal.fire(alertaExito).then(() => {
            this.resetForm();
          });
        },
        error: err => {
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear' });
        }
      });
    }
  }

  // =========================
  //  RESET
  // =========================
  resetForm() {
    this.articulo = {
      titulo: '',
      contenido: '',
      resumen: '',
      categoriaId: this.categorias.length > 0 ? this.categorias[0].id : 0,
      publicada: true,
      imagenes: []
    };

    this.previewUrls = [];
  }
}
