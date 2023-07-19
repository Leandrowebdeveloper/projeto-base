import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InitializeGuard } from './services/guard/initialize/initialize.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routers/routers.module').then((m) => m.RoutersComponentModule),
    resolve: {
      initialize: InitializeGuard,
    },
    canLoad: [InitializeGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
