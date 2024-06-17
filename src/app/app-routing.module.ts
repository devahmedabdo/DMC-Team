import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
// import { AppComponent } from './app.component';
// import { AppModule } from './modules/app/app.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppComponent } from './modules/app/app.component';
import { AppModule } from './modules/app/app.module';
import { AuthGuard } from './services/gaurd/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
  {
    path: 'reset-password/:token',
    canActivate: [AuthGuard],
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
