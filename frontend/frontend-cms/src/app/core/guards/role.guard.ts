import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Si es SSR, dejar pasar (render público)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const role = auth.getRole();

  if (role !== 'ADMIN') {
    router.navigate(['/articulos']);
    return false;
  }

  return true;
};
