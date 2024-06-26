import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/master/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn === false ) {
    inject(Router).navigate(['/']);
    return false;
  } else {
    return true;
  }
};
