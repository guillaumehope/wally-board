import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { CandidatAccount } from './auth.model';

@Injectable({ providedIn: 'root' })
export class CandidatLoginService {
  ipBackend = environment.ipBackend;
  private isCandidatAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private loginStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuth() {
    return this.isCandidatAuthenticated;
  }

  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const candidatAccount: CandidatAccount = {
      email: email,
      password: password
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        this.ipBackend + '/candidat/login',
        candidatAccount
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isCandidatAuthenticated = true;
            this.userId = response.userId;
            this.loginStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.loginStatusListener.next(false);
          console.log(error);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.GetAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isCandidatAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.loginStatusListener.next(true);
    }
  }

  getCandidatProfile() {
    return this.http.get<{
      _id: string;
      email: string;
      lastname: string;
      firstname: string;
      phonenumber: string;
      cityaddress: string;
      zipcodeaddress: string;
    }>(this.ipBackend + '/candidat/on');
  }

  logout() {
    this.token = null;
    this.isCandidatAuthenticated = false;
    this.loginStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private GetAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}

export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
