import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  registerForm: FormGroup;
  country = 'country';
  state = 'state';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [
    {name: 'Cricket'}
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DialogComponent>,
  private formBuilder: FormBuilder,
  private _snackBar: MatSnackBar) { }

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

  onSubmitForm(){
    const openSnackBar = this._snackBar.open('Registered Successfully', 'ok', {
      duration: 2000,
    });
    this.closeDialog();
  }

  //chips
  add(event) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tags: Tags): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
