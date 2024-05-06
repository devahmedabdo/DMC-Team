import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { CartComponent } from './view/cart/cart.component';
import { LikedComponent } from './view/liked/liked.component';
import { ConvoysComponent } from './view/convoys/convoys.component';
import { DetailsComponent } from './view/convoys/details/details.component';

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
        path: 'liked',
        component: LikedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
