import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CandidatLoginService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-candidat-login',
  templateUrl: './candidat-login.component.html',
  styleUrls: ['./candidat-login.component.css']
})
export class CandidatLoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  form: FormGroup;

  constructor(public candidatLogin: CandidatLoginService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
    this.authStatusSub = this.candidatLogin
      .getLoginStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.candidatLogin.login(this.form.value.email, this.form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
