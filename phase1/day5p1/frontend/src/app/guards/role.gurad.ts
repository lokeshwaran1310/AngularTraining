import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (expectedRole: string): CanActivateFn => {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const auth = inject(AuthService);
        const router = inject(Router);
        const userRole = auth.getUserRole();
        
        console.log('RoleGuard - Expected Role:', expectedRole);
        console.log('RoleGuard - User Role:', userRole);
        console.log('RoleGuard - Roles Match:', userRole === expectedRole);

        if (userRole === expectedRole) {
            return true;
        } else {
            router.navigate(['/unauthorized']);
            return false;
        }
    };
};
