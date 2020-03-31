import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  registerForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DialogComponent>,
  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required, Validators.email]],
    });    
  }

  imageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
       
      }, false);
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }
}
