export interface ArticuloResponse {

  id: number;

  titulo: string;

  contenido: string;

  resumen: string;

  slug: string;

  categoria: string;

  categoriaId: number;

  autor: string;

  publicada: boolean;

  fechaPublicacion: string;

  imagenes: string[];
}
