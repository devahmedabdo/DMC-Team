import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// out modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SvgAnimatedComponent } from './components/svg-animated/svg-animated.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TitleDirective } from './directives/title.directive';
import { RevealDirective } from './directives/reveal.directive';
import { IncrementDirective } from './directives/increment.directive';
@NgModule({
  declarations: [
    SvgAnimatedComponent,
    TitleDirective,
    RevealDirective,
    IncrementDirective,
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    FontAwesomeModule,
    NgSelectModule,
  ],
  exports: [
    ImageCropperModule,
    FontAwesomeModule,
    CommonModule,
    SvgAnimatedComponent,
    NgSelectModule,
    TitleDirective,
    IncrementDirective,
    RevealDirective,
  ],
})
export class SharedModule {}
