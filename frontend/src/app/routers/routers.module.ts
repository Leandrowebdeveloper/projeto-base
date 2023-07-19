import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutersComponentRoutingModule } from './routers-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule, CommonModule, RoutersComponentRoutingModule],
})
export class RoutersComponentModule {}
