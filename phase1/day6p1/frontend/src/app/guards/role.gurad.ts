import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (allowedRoles: string[]): CanActivateFn => {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const auth = inject(AuthService);
        const router = inject(Router);
        const userRole = auth.getUserRole();
        
        if (userRole && allowedRoles.includes(userRole)) {
            return true;
        } else {
            router.navigate(['/unauthorized']);
            return false;
        }
    };
};
