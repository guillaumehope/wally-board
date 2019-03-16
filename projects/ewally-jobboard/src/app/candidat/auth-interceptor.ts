import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CandidatLoginService } from './auth.service';


@Injectable()
export class CandidatLoginInterceptor implements HttpInterceptor {

  constructor(private candidatLoginService: CandidatLoginService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const loginToken = this.candidatLoginService.getToken();
    const loginRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + loginToken)
    });
    return next.handle(loginRequest);
  }
}
