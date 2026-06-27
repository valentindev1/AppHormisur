export interface ArticuloRequest {

  titulo: string;

  contenido: string;

  resumen: string;

  categoriaId: number;

  publicada: boolean;

  imagenes: File[];

}
