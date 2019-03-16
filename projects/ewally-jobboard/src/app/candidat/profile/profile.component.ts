import { Component, OnInit } from '@angular/core';
import { CandidatLoginService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string;
  userLastname: string;
  userFirstname: string;
  userPhonenumber: string;
  userCityaddress: string;
  userZipcodeaddress: string;

  constructor(public candidatLoginService: CandidatLoginService) {}

  ngOnInit() {
    this.candidatLoginService.getCandidatProfile().subscribe(candidatData => {
      this.userEmail = candidatData.email;
      this.userLastname = candidatData.lastname;
      this.userFirstname = candidatData.firstname;
      this.userPhonenumber = candidatData.phonenumber;
      this.userCityaddress = candidatData.cityaddress;
      this.userZipcodeaddress = candidatData.zipcodeaddress;
    });
  }
}
