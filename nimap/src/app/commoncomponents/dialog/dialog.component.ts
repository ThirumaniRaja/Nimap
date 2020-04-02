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
  updateId;
  imageContainer = [];
  showIcon = true;

  addressData: Address[];
  userData: IUser;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private _snackBar: MatSnackBar) {
    console.log(data);
  }

  ngOnInit(): void {
    this.createForm();
    this.onTagsCheck();
    this.onEditPhoto();
    this.onEditData();
  }
  ngAfterViewInit() {
    // this.onEditData();
  }

  onTagsCheck() {
    if (this.data.action === 'register') {
      this.tags = [];
    }
    else {
      this.tags = this.data.updateData.hobbies;
    }
  }

  onEditPhoto() {
    if (this.data.edit === 'photo') {
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
      phone: [''] ,
      address: [''],
      state: [''],
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
        this.imageContainer = event.target.result;
        console.log(this.imageContainer)
        this.showIcon = false;

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
          { address1: this.registerForm.value.homeAddress1 }, { address2: this.registerForm.value.homeAddress2 }]
      }
    ]

    this.userData = {
      fname: this.registerForm.value.fname,
      lanme: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      profilePic: this.imageContainer,
      age: this.age,
      state: this.registerForm.value.state,
      country: this.registerForm.value.country,
      hobbies: this.tags,
      subscribe: this.checknewsletter,
      address: this.addressData
    }

    if (this.RegisterFormControls.fname.valid) {
      console.log(this.userData)
      this.register.adduser(this.userData).subscribe(data => {
        console.log(data)
        this._snackBar.open('Registered Successfully', 'ok', {
          duration: 2000,
        });
        this.closeDialog();
      })

    }
    else{
      this._snackBar.open('please provide valid first name', 'ok', {
        duration: 2000,
      });
    }
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


  //update method for update form
  onUpdateForm() {
    this.updateId = this.data.updateData.id;
   if(this.imageContainer.length === 0){
     this.imageContainer = this.data.updateData.profilePic
     console.log('000',this.imageContainer)
   }
    this.imageContainer = this.data.updateData.profilePic
    console.log(this.data.updateData.id)
    console.log(this.updateId)
    this.addressData = [
      {
        officeAddress: [{ address1: this.registerForm.value.companyAddress1 }, { address2: this.registerForm.value.companyAddress2 }
        ],
        homeAddress: [
          { address1: this.registerForm.value.homeAddress1 }, { address2: this.registerForm.value.homeAddress2 }]
      }
    ]

    this.userData = {

      fname: this.registerForm.value.fname,
      lanme: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      profilePic: this.imageContainer,
      age: this.age,
      state: this.registerForm.value.state,
      country: this.registerForm.value.country,
      hobbies: this.tags,
      subscribe: this.checknewsletter,
      address: this.addressData,
    }

    console.log(this.userData, this.age)
    this.register.updateUser(this.userData, this.updateId).subscribe(data => {
      console.log(data)
      this._snackBar.open('Form Updated Successfully', 'ok', {
        duration: 2000,
      });
      this.closeDialog();
    })
   }

  //onload data for update 
  onEditData() {
    if (this.data.action === 'update') {
      this.age = this.data.updateData.age;
      if(this.data.updateData.profilePic !==''){
      this.imageContainer = this.data.updateData.profilePic;
      this.showIcon = false
      }
      this.checknewsletter = this.data.updateData.subscribe;
      console.log(this.data.updateData.state)
      this.registerForm.patchValue({
        state: this.data.updateData.state,
        fname: this.data.updateData.fname,
        lname: this.data.updateData.lanme,
        age: this.age,
       // profilepic: this.data.updateData.profilePic,
        email: this.data.updateData.email,
        phone: this.data.updateData.phone,
        address: this.data.updateData.address,
        country: this.data.updateData.country,
        hobbies: this.data.updateData.hobbies,
        //id:this.data.updateData.id,
        subscribe: this.checknewsletter,
        homeAddress1: this.data.updateData.address[0].officeAddress[0].address1,
        homeAddress2: this.data.updateData.address[0].officeAddress[1].address2,
        companyAddress1: this.data.updateData.address[0].homeAddress[0].address1,
        companyAddress2: this.data.updateData.address[0].homeAddress[1].address2

      });

    }
  }

}
