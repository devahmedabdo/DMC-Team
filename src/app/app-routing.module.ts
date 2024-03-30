import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
// import { AppComponent } from './app.component';
// import { AppModule } from './modules/app/app.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppComponent } from './modules/app/app.component';
import { AppModule } from './modules/app/app.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/app/app.module').then((m) => m.AppModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, AppModule, AuthModule],
})
export class AppRoutingModule {}
