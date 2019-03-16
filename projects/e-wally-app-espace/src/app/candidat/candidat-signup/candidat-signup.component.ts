import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CandidatSignupService } from './candidat-signup.service';
// import { PasswordValidator } from './password.validator';

@Component({
  selector: 'app-candidat-signup',
  templateUrl: './candidat-signup.component.html',
  styleUrls: ['./candidat-signup.component.css']
})
export class CandidatSignupComponent /* implements OnInit */ {
  isLoading = false;
  isDone = false;
  favoriteSeason: string;

  constructor(public candidatSignupService: CandidatSignupService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const pass = form.value.password;
    const confirmPass = form.value.confirmpassword;
    if (pass === confirmPass) {
      this.isLoading = true;
      this.candidatSignupService.createUser(
        form.value.lastname,
        form.value.email,
        form.value.password
      );
    } else {
      return;
    }
  }
}
