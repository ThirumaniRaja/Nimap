import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './commoncomponents/navbar/navbar.component';
import { DialogComponent } from './commoncomponents/dialog/dialog.component';
import { FooterComponent } from './commoncomponents/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HomeComponent } from './home/home.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
    FooterComponent,
    HomeComponent,
    UserregistrationComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
