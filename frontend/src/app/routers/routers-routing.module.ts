import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'painel-de-controle',
    loadChildren: () =>
      import('../pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'entrar',
    loadChildren: () =>
      import('../pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'erro',
    loadChildren: () =>
      import('../pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
  {
    path: 'sair',
    loadChildren: () =>
      import('../pages/logout/logout.module').then((m) => m.LogoutPageModule),
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/erro',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutersComponentRoutingModule {}
