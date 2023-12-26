import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// out modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, ImageCropperModule, FontAwesomeModule],
  exports: [ImageCropperModule, FontAwesomeModule, CommonModule, CardComponent],
})
export class SharedModule {}
