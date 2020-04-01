import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { DialogComponent } from '../commoncomponents/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  registeredData: any;
  hobbies:[];

  constructor(private userData: RegisterService,public dialog: MatDialog) { }

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

  onClickUpdate(formData){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height:'600px',
      data: { action: 'update',updateData:formData}
    });
  }

  onClickProfileUpdate(formData,value){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height:'600px',
      data: { action: 'update',updateData:formData,edit:value}
    });
  }
  
}
