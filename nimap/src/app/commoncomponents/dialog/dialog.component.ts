import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../usermodel/user';
import { RegisterService } from 'src/app/services/register.service';

export interface Tags {
  name: string;
}

export interface Address {
  officeAddress: [{ address1: string }, { address2: string }],
  homeAddress: [{ address1: string }, { address2: string }]
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
  adds = "Address";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  formDisable = false;
  age = 0;
  checknewsletter = false;

  addressData: Address[];
  userData: IUser;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [
    { name: 'Cricket' }
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private _snackBar: MatSnackBar) {
      console.log(data)
      //this.onEditData();
      
     }

  ngOnInit(): void {
    this.onEditPhoto();
    // this.onEditData();
    this.createForm();
  }
  ngAfterViewInit(){
        this.onEditData();
  }

  onEditPhoto(){
    if(this.data.edit === 'photo'){
      this.formDisable = true;
      console.log("disable")
    }
  }

  get RegisterFormControls() {
    return this.registerForm.controls;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z \-\']+')]],
      lname: [''],
      profilepic: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.maxLength(10)]],
      address:[''],
      state:  [''],
      country: [''],
      homeAddress1: [''],
      homeAddress2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
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

  onSubmitForm() {
    console.log(this.adds)
    this.addressData = [
      {
        officeAddress: [{ address1: this.registerForm.value.companyAddress1 }, { address2: this.registerForm.value.companyAddress2 }
        ],
        homeAddress: [
          { address1:  this.registerForm.value.homeAddress1}, { address2: this.registerForm.value.homeAddress2 }]
      }
    ]

    this.userData = {
      fname: this.registerForm.value.fname,
      lanme: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      profilePic: this.registerForm.value.profilepic,
      age: this.age,
      state: this.registerForm.value.state,
      country: this.registerForm.value.country,
      hobbies: this.tags,
      subscribe: this.checknewsletter,
      address:this.addressData  
    }

    if (this.RegisterFormControls.fname.valid) {
      console.log(this.userData)
      this.register.adduser(this.userData).subscribe(data => {
        console.log(data)
      })

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
      this.tags.push({ name: value.trim() });
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

  onUpdateForm(){

  }

  onEditData(){
    if(this.data.action === 'update'){
      console.log(this.data.updateData.state)
      this.registerForm.patchValue({  
        state: this.data.updateData.state,
        fname:this.data.updateData.fname,
        lname:this.data.updateData.lanme

      });
      // this.registerForm.patchValue({});

  }
}

}
