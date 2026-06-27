export interface ConcretoDetalle {
  id: string; // Este será el parámetro de la URL (ej: 'convencionales')
  titulo: string;
  subtitulo: string;
  descripcionLarga: string;
  imagenHero: string;
  ventajas: string[];
  usosRecomendados: string[];
  fichaTecnicaUrl?: string; // Opcional, por si hay un PDF
  video?: string;
}
