import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ValidatorMessagePipe } from './pipe/validator-message.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './service/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LoginPage, ValidatorMessagePipe],
  providers: [LoginService],
})
export class LoginPageModule {}
