import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/app.state';
import { selectAccessAuth } from 'src/app/auth/state/auth.selector';
import { map, take } from 'rxjs';

export const accessGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectAccessAuth).pipe(
    take(1),
    map((access) => {
      const currentPath = state.url;
      const hasAccess = access.some((access) => access.path === currentPath);

      if (!hasAccess) {
        router.navigate([access[0].path]);
        return false;
      }
      return true;
    })
  );
};
