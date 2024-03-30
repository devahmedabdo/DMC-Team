import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { defineElement } from 'lord-icon-element';
// import lottie from 'lottie-web';
@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // ImageCropperModule,
    // FontAwesomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {
  // constructor() {
  //   defineElement(lottie.loadAnimation);
  // }
}
