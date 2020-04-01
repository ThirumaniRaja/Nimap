import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../commoncomponents/dialog/dialog.component';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private getUser: RegisterService) { }

  ngOnInit(): void {
  }

  onClickRegister(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height:'600px',
      data: { id: 'works'}
    });
  }

  getAllUsers()
  {
    this.getUser.getUser().subscribe(data=>{
      console.log(data);
    })
  }

  
}
