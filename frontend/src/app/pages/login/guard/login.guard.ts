import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../login';
import { LoginService } from '../service/login.service';

@Injectable()
export class LoginResolver {
  constructor(private loginService: LoginService) {}
  resolve(): Observable<Login> {
    return this.loginService.getLogin();
  }
}
