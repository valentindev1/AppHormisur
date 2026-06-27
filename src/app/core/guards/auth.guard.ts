import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ En SSR no bloquear (permitir render)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // ✅ En navegador validar sesión
  if (authService.isLogged()) {
    return true;
  }

  // ❌ No autenticado → redirige
  router.navigate(['/login']);
  return false;
};
