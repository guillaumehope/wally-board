import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CandidatLoginService } from './auth.service';


@Injectable()
export class CandidatGuard implements CanActivate {
  constructor(private candidatLoginService: CandidatLoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isLog = this.candidatLoginService.getIsAuth();
    if (!isLog) {
      this.router.navigate(['/login']);
    }
    return isLog;
  }
}

