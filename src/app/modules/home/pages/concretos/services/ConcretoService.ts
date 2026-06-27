import { Injectable } from '@angular/core';
import { ConcretoDetalle } from '../models/ConcretoDetalle';

@Injectable({
  providedIn: 'root'
})
export class ConcretoService {

  // Base de datos simulada con el catálogo completo de Hormigones del Sur
  private concretosBd: ConcretoDetalle[] = [
    {
      id: 'convencionales',
      titulo: 'Concreto Convencional',
      subtitulo: 'Resistencia y versatilidad para tu obra',
      descripcionLarga: 'Nuestra mezcla estándar de alta calidad, dosificada electrónicamente para garantizar la resistencia exacta solicitada. Es la solución ideal para cimentaciones, elementos estructurales tradicionales y proyectos de uso general que requieren un excelente desempeño arquitectónico.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/1.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Excelente manejabilidad y facilidad de colocación',
        'Tiempos de fraguado óptimos y controlados',
        'Cumplimiento estricto de las normas sismorresistentes nacionales',
        'Acabados limpios en estructuras expuestas o desmoldadas'
      ],
      usosRecomendados: [
        'Zapatas, vigas de amarre y cimentaciones',
        'Columnas, losas de entrepiso y placas tradicionales',
        'Muros de contención básicos y ciclópeos',
        'Andenes, bordillos y rampas peatonales'
      ]
    },
    {
      id: 'pavimentos',
      titulo: 'Concreto para Pavimentos',
      subtitulo: 'Máxima durabilidad ante el tráfico pesado',
      descripcionLarga: 'Diseñado rigurosamente bajo criterios de módulo de rotura (MR) a la flexotracción. Esta mezcla está optimizada para soportar el desgaste continuo, los impactos y las cargas dinámicas pesadas, garantizando una vida útil prolongada en infraestructuras viales.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/2.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Altísima resistencia a la abrasión y al desgaste superficial',
        'Bajo nivel de contracción por secado, disminuyendo fisuras',
        'Soporta ataques químicos leves por hidrocarburos o lavado continuo',
        'Permite acabados estriados o texturizados de alta fricción'
      ],
      usosRecomendados: [
        'Vías urbanas, secundarias y carreteras de alto tráfico',
        'Pistas de aterrizaje y terminales de transporte',
        'Patios de maniobras y zonas de carga industrial',
        'Estaciones de servicio y parqueaderos públicos'
      ]
    },
    {
      id: 'industrializado',
      titulo: 'Concreto Industrializado',
      subtitulo: 'Fraguado rápido y optimizado para construcción en serie',
      descripcionLarga: 'Mezcla diseñada específicamente para proyectos que emplean sistemas de formaletería rápida o moldeado industrial. Cuenta con una evolución acelerada de la resistencia en las primeras horas, permitiendo desmoldar en tiempos récord y acelerar el cronograma constructivo.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/3.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Altas resistencias a edades tempranas (desencofrado rápido)',
        'Excelente cohesión que evita la segregación en muros esbeltos',
        'Fluidez adaptada para un llenado homogéneo sin vacíos estructurales',
        'Maximiza el rendimiento del equipo de formaletas'
      ],
      usosRecomendados: [
        'Sistemas constructivos industrializados de muros y placas simultáneas',
        'Viviendas de interés social (VIS) en serie o altura',
        'Elementos prefabricados en planta o pie de obra',
        'Proyectos con ritmos de fundición altamente exigentes'
      ]
    },
    {
      id: 'baja-permeabilidad',
      titulo: 'Concreto de Baja Permeabilidad',
      subtitulo: 'Protección extrema contra la filtración de líquidos',
      descripcionLarga: 'Dosificado con aditivos de última generación que reducen el tamaño de los poros capilares dentro de la matriz del concreto. Bloquea de manera drástica el paso del agua y agentes contaminantes, protegiendo el acero de refuerzo contra la corrosión.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/4.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Reducción drástica de la absorción capilar y permeabilidad',
        'Mayor durabilidad en ambientes húmedos o agresivos',
        'Previene la aparición de humedades, hongos y eflorescencias',
        'Excelente resistencia a la presión hidrostática positiva y negativa'
      ],
      usosRecomendados: [
        'Tanques de almacenamiento de agua potable y plantas de tratamiento',
        'Piscinas, canales de riego y estructuras hidráulicas',
        'Sótanos, muros pantalla y cimentaciones bajo el nivel freático',
        'Cubiertas, losas expuestas y zonas de lavado'
      ]
    },
    {
      id: 'baja-contraccion',
      titulo: 'Concreto de Baja Contracción',
      subtitulo: 'Estabilidad dimensional para grandes superficies',
      descripcionLarga: 'Mezcla tecnológica diseñada para controlar los efectos de la contracción por secado y cambios térmicos del material. Reduce significativamente las tensiones internas durante el proceso de endurecimiento, minimizando el riesgo de agrietamientos espontáneos.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/5.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Disminución crítica del agrietamiento y fisuración por secado',
        'Permite el diseño de placas con menor cantidad de juntas de control',
        'Mantiene una excelente planicidad y estabilidad dimensional',
        'Reduce drásticamente los costos de mantenimiento vial o industrial'
      ],
      usosRecomendados: [
        'Pisos industriales de gran extensión sin juntas o juntas distanciadas',
        'Losas para centros logísticos y almacenes de alta estantería',
        'Estructuras masivas de concreto donde el calor de hidratación es crítico',
        'Pavimentos residenciales y comerciales premium'
      ]
    },
    {
      id: 'morteros',
      titulo: 'Morteros Estructurales y de Larga Duración',
      subtitulo: 'Mezclas listas con manejabilidad y fraguado programado',
      descripcionLarga: 'Mezclas de cemento, agua y arena fina, controladas en laboratorios para garantizar una dosificación perfecta. Diseñados con tiempos de manejabilidad extendidos mediante aditivos retenedores de agua, ideales para trabajos de mampostería y acabados que exigen alta adherencia.',
      imagenHero: 'assets/img/1.jpg',
      video: 'assets/video/6.mp4', // <-- Atributo de video agregado
      ventajas: [
        'Manejabilidad prolongada en estado fresco (mantiene la trabajabilidad)',
        'Excelente adherencia al ladrillo, bloque o superficie base',
        'Menor desperdicio de material en obra comparado con mezclas manuales',
        'Resistencia a la compresión garantizada y homogénea en todo el lote'
      ],
      usosRecomendados: [
        'Pega de mampostería estructural y no estructural',
        'Pañetes, revoques o revoques de muros internos y fachadas',
        'Nivelación de pisos y plantillas de base',
        'Inyecciones de mortero (Grouting) en celdas de muros'
      ]
    },
    {
      id: 'concreto-tremie',
      titulo: 'Concreto Tremie',
      subtitulo: 'Fluidez controlada y alta cohesión para vaciados sin segregación',
      descripcionLarga: 'Concreto especialmente diseñado para colocación en condiciones subacuáticas o en excavaciones profundas donde no es posible un vaciado convencional. Su mezcla incluye aditivos que mejoran la cohesión y reducen la segregación y el lavado del cemento, permitiendo una colocación continua mediante tubería Tremie. Garantiza alta estabilidad, resistencia y calidad estructural incluso en presencia de agua.',
      imagenHero: 'assets/img/9.jpg',
      video: 'assets/video/11.mp4',
      ventajas: [
        'Alta cohesión que evita la segregación y el lavado de la pasta cementante',
        'Excelente fluidez que permite el desplazamiento uniforme dentro de la tubería Tremie',
        'Colocación continua sin necesidad de vibración externa',
        'Óptimo desempeño en ambientes saturados o bajo nivel freático',
        'Resistencia estructural uniforme y mayor durabilidad'
      ],
      usosRecomendados: [
        'Cimentaciones profundas como pilotes y pilas',
        'Estructuras bajo agua o en zonas inundadas',
        'Muros pantalla y excavaciones profundas',
        'Obras portuarias, puentes y estribos',
        'Sellado de fondos en excavaciones con presencia de agua'
      ]
    }


  ];

  constructor() { }

  // Metodo para buscar el concreto por su ID (coincide con el parámetro de la URL)
  obtenerConcretoPorId(id: string): ConcretoDetalle | undefined {
    return this.concretosBd.find(c => c.id === id);
  }
}
