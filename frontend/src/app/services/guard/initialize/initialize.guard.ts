import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { InitializeService } from '../../initialize/initialize.service';
import { Initialize } from '../../initialize/initialize';

@Injectable({
  providedIn: 'root',
})
export class InitializeGuard {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private InitializeService: InitializeService,
    private plt: Platform
  ) {}

  async canLoad(): Promise<boolean> {
    await this.storageService.init();
    await this.storageService.isToken();
    this.authService.isLoggedIn = !!this.storageService.getToken;
    return true;
  }

  resolve(): Observable<Initialize> {
    return this.InitializeService.initialize().pipe(
      tap((init: Initialize) => {
        if (init) {
          this.authService.setAuth(init.auth);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return EMPTY;
      })
    );
  }

  // async resolve(): Promise<Observable<Initialize>> {
  //   return this.plt.ready().then(() => {
  //     if (this.plt.is('capacitor')) {
  //        return await this.put();
  //     }
  //     return this.InitializeService.init().pipe(
  //       tap((init: Initialize) => {
  //         if (init) {
  //           this.authService.setAuth(init.auth);
  //         }
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         return EMPTY;
  //       })
  //     );
  //   });
  // }

  // private put = async () => {
  //     const options = {
  //         url: `${environment.api}${this.InitializeService.getApi}`,
  //         headers: {
  //             token: await this.InitializeService.storageService.find('token'),
  //             'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         data: 'token=ABCXYZJJJ',
  //     };

  //     const response: HttpResponse = await CapacitorHttp.put(options);
  //     if (response.status === 200) {
  //     }
  //     return true;
  // };
}
