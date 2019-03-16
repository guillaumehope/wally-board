import { Component, OnInit } from '@angular/core';

import { CandidatLoginService } from './candidat/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-wally-app-espace';
  isLoading;
  constructor(private candidatLoginService: CandidatLoginService) {}

  ngOnInit() {
    this.candidatLoginService.autoAuthUser();
  }
}
