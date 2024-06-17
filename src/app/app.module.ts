// in modules
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// component
import { AppComponent } from './app.component';

// out modules
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// import { CommonModule } from '@angular/common';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ImageCropperModule } from 'ngx-image-cropper';

// import Swiper from 'swiper';
// register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { ToastNoAnimationModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    // Swiper
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    defineElement(lottie.loadAnimation);
    library.addIconPacks(fas, fab, far);
    register();
  }
}
