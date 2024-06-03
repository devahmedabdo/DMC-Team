import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { CartComponent } from './view/cart/cart.component';
import { LikedComponent } from './view/liked/liked.component';
import { ConvoysComponent } from './view/convoys/convoys.component';
import { DetailsComponent } from './view/convoys/details/details.component';
import { GalleryComponent } from './view/gallery/gallery.component';
import { ProductDetailsComponent } from './view/gallery/product-details/product-details.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { DetailsComponent as ProjectDetails } from './view/projects/details/details.component';
import { CreatOrderComponent } from './view/cart/creat-order/creat-order.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'convoys',
        component: ConvoysComponent,
      },
      {
        path: 'convoys/:id',
        component: DetailsComponent,
      },

      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'creatorder',
        component: CreatOrderComponent,
      },
      {
        path: 'liked',
        component: LikedComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'gallery/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectDetails,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
