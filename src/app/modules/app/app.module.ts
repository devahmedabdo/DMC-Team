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
import { CartComponent } from './view/cart/cart.component';
import { LikedComponent } from './view/liked/liked.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './view/gallery/gallery.component';
import { ProductDetailsComponent } from './view/gallery/product-details/product-details.component';
import { PaginationBtnComponent } from './components/pagination-btn/pagination-btn.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { DetailsComponent as ProjectDetails } from './view/projects/details/details.component';
import { CreatOrderComponent } from './view/cart/creat-order/creat-order.component';
import { PageLandingComponent } from './components/page-landing/page-landing.component';
import { AboutComponent } from './view/about/about.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './view/profile/profile.component';

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
    CartComponent,
    LikedComponent,
    NavigatorComponent,
    GalleryComponent,
    ProductDetailsComponent,
    PaginationBtnComponent,
    ProjectsComponent,
    ProjectDetails,
    CreatOrderComponent,
    PageLandingComponent,
    AboutComponent,
    LoadingComponent,
    ProfileComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {
  constructor() {
    register();
  }
}
