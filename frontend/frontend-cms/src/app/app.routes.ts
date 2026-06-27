import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // ========================
  // HOME (PÚBLICO)
  // ========================
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/pages/home/home.component')
        .then(c => c.HomeComponent),
    title: 'Inicio | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'noticias',
    loadComponent: () =>
      import('./modules/home/pages/noticias/noticias.component')
        .then(c => c.NoticiasComponent),
    title: 'Noticias | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component')
        .then(c => c.LoginComponent),
    title: 'Iniciar Sesión | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'articulos/:categoria/:slug',
    loadComponent: () =>
      import('./modules/articulos/pages/ver-articulo/ver-articulo.component')
        .then(c => c.VerArticuloComponent),
    title: 'Artículo | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./pages/politica-privacidad/politica-privacidad.component')
        .then(c => c.PoliticaPrivacidadComponent),
    title: 'Política de Privacidad | Hormigones del Sur'
  },

  {
    path: 'terminos-condiciones',
    loadComponent: () =>
      import('./pages/terminos-condiciones/terminos-condiciones.component')
        .then(c => c.TerminosCondicionesComponent),
    title: 'Términos y Condiciones | Hormigones del Sur'
  },

  {
    path: 'nosotros',
    loadComponent: () =>
      import('./modules/home/pages/nosotros/nosotros.component')
        .then(c => c.NosotrosComponent),
    title: 'Nosotros | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'concretos',
    loadComponent: () =>
      import('./modules/home/pages/concretos/concretos.component')
        .then(c => c.ConcretosComponent),
    title: 'Concretos | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'concreto/:tipo',
    loadComponent: () =>
      import('./modules/home/pages/concretos/concreto-detalle/concreto-detalle.component')
        .then(c => c.ConcretoDetalleComponent),
    title: 'Ficha Técnica | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'trabaja-con-nosotros',
    loadComponent: () =>
      import('./modules/home/pages/trabaja-con-nosotros/trabaja-con-nosotros.component')
        .then(c => c.TrabajaConNosotrosComponent),
    title: 'Trabaja con Nosotros | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'contacto',
    loadComponent: () =>
      import('./modules/home/pages/contacto/contacto.component')
        .then(c => c.ContactoComponent),
    title: 'Contacto | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'maquinaria',
    loadComponent: () =>
      import('./modules/home/pages/maquinaria/maquinaria.component')
        .then(c => c.MaquinariaComponent),
    title: 'Servicio de Maquinaria | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'prefabricados',
    loadComponent: () =>
      import('./modules/home/pages/prefabricados/prefabricados.component')
        .then(c => c.PrefabricadosComponent),
    title: 'Prefabricados | Concretera Hormigones Del Sur SAS'
  },

  {
    path: 'proyectos',
    loadComponent: () =>
      import('./modules/home/pages/proyectos/proyectos.component')
        .then(c => c.ProyectosComponent),
    title: 'Proyectos | Concretera Hormigones Del Sur SAS'
  },

  // ========================
  // ADMIN (PROTEGIDO)
  // ========================
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    loadComponent: () =>
      import('./modules/admin/layout/admin-layout/admin-layout.component')
        .then(c => c.AdminLayoutComponent),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/admin/pages/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
        title: 'Dashboard | Admin Hormigones Del Sur'
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./modules/categorias/pages/gestionar-categorias/gestionar-categorias.component')
            .then(c => c.GestionarCategoriasComponent),
        title: 'Categorías | Admin Hormigones Del Sur'
      },
      {
        path: 'articulos',
        loadComponent: () =>
          import('./modules/articulos/pages/listar-articulos/listar-articulos.component')
            .then(c => c.ListarArticulosComponent),
        title: 'Artículos | Admin Hormigones Del Sur'
      },
      {
        path: 'articulos/crear',
        loadComponent: () =>
          import('./modules/articulos/pages/crear-articulo/crear-articulo.component')
            .then(c => c.CrearArticuloComponent),
        title: 'Crear Artículo | Admin Hormigones Del Sur'
      },
      {
        path: 'articulos/editar/:id',
        loadComponent: () =>
          import('./modules/articulos/pages/crear-articulo/crear-articulo.component')
            .then(c => c.CrearArticuloComponent),
        title: 'Editar Artículo | Admin Hormigones Del Sur'
      }
    ]
  },

  // ========================
  // FALLBACK
  // ========================
  {
    path: '**',
    loadComponent: () =>
      import('./modules/home/pages/not-found/not-found.component')
        .then(c => c.NotFoundComponent),
    title: 'Página no encontrada | Hormigones del Sur'
  }

];
