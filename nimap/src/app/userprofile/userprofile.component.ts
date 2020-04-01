import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  registeredData: any;
  hobbies:[];

  constructor(private userData: RegisterService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.userData.getUser().subscribe(result => {
      console.log(result)
      this.registeredData = result;
      this.hobbies =result[0]['hobbies'];
      console.log(this.hobbies)
    })
  }
}
