import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeComponent } from './view/home/home.component';
import { ConvoysComponent } from './view/convoys/convoys.component';
import { DetailsComponent } from './view/convoys/details/details.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToTopComponent } from './layout/to-top/to-top.component';
import { register } from 'swiper/element/bundle';
import { ProductComponent } from '../app/components/product/product.component';
import { CardComponent } from '../app/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConvoysComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
    ToTopComponent,
    ProductComponent,
    CardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class AppModule {
  constructor() {
    register();
  }
}
