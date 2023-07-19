import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './header/breadcrumb/breadcrumb.component';
import { PipeModule } from '../services/pipes/pipe.module';

@NgModule({
  declarations: [HeaderComponent, BreadcrumbComponent],
  imports: [CommonModule, IonicModule, RouterModule, PipeModule],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
