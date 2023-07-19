import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Login } from '../login';
import { HttpService } from 'src/app/services/http/http.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class LoginService extends HttpService<Login> {
  constructor(
    override http: HttpClient,
    public override storageService: StorageService,
    private navCtrl: NavController
  ) {
    super(http, storageService);
    this.setApi = 'login';
  }

  public setLogin(data: Login): Observable<Login> {
    return this.post(data).pipe(
      tap((login: Login) => {
        if (login.token) {
          this.storageToken(login);
          this.setRoute();
        }
      })
    );
  }

  private setRoute(): void {
    this.navCtrl.navigateForward('painel-de-controle');
  }

  private storageToken({ token }: Login): void {
    this.storageService.create('token', token);
  }

  public getLogin(): Observable<Login> {
    return this.findOne();
  }
}
