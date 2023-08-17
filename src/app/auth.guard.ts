import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let loginComponent = inject(LoginComponent);

  if (loginComponent.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']); // Redirect to login page if not logged in
    return false;
  }
};
