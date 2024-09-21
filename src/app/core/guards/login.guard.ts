import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getMe().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/overview']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};
