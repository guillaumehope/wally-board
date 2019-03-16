import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidatSignup } from './candidat-signup.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CandidatSignupService {
  ipBackend = environment.ipBackend;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(lastname: string, email: string, password: string) {
    const candidatSignup: CandidatSignup = {
      lastname: lastname,
      email: email,
      password: password
    };
    this.http
      .post<{ userId: string }>(
        this.ipBackend + '/candidat/signup',
        candidatSignup
      )
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }
}
