import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { CartComponent } from './view/cart/cart.component';
import { LikedComponent } from './view/liked/liked.component';

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
        component: HomeComponent,
      },
      {
        path: 'convoy',
        component: HomeComponent,
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
