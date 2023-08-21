import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn) {
    return true;
  }

  // Retain the attempted URL for redirection
  authService.redirectUrl = state.url;
  router.navigate(['/login']);
  return false;
};

