import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import {IUser} from '../../usermodel/user';

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
  age = 0;
  checknewsletter = false;
  
  userData:IUser;
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

  get RegisterFormControls() {
    return this.registerForm.controls;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]],
      lname: [''],
      profilepic:[''],
      email:['',[Validators.email]],
      phone:['',[Validators.maxLength(10)]],
      state:[''],
      country:[''],
      homeAddress1:[''],
      homeAddress2:[''],
      companyAddress1:[''],
      companyAddress2:[''],
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

  subscribeCheckbox(event) {
    if (event.checked) {
       this.checknewsletter = true;
    } else {
     this.checknewsletter = false;
    }
  }

  onSubmitForm(){
   this.userData = {
     fname:this.registerForm.value.fname,
     lanme:this.registerForm.value.lname,
     email:this.registerForm.value.email,
     phone:this.registerForm.value.phone,
     profilePic:this.registerForm.value.profilepic,
     age:this.age,
     state:this.registerForm.value.state,
     country:this.registerForm.value.country,
     companyaddress1:this.registerForm.value.homeAddress1,
     companyaddress2:this.registerForm.value.homeAddress2,
     homeaddress1:this.registerForm.value.homeAddress1,
     homeaddress2:this.registerForm.value.homeAddress2,
     hobbies:this.tags,
     subscribe:this.checknewsletter
   }

   if(this.RegisterFormControls.fname.valid){
    console.log(this.userData)
   }
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
