import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidatLoginService } from 'projects/e-wally-app-espace/src/app/candidat/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private loginListenerSubs: Subscription;

  constructor(private candidatLoginService: CandidatLoginService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.candidatLoginService.getIsAuth();
    this.loginListenerSubs = this.candidatLoginService
      .getLoginStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.candidatLoginService.logout();
  }

  ngOnDestroy() {
    this.loginListenerSubs.unsubscribe();
  }
}
