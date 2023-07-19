import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { LoginResolver } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    resolve: {
      login: LoginResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginResolver],
})
export class LoginPageRoutingModule {}
