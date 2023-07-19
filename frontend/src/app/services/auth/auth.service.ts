import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
export interface User {
  token: string;
  createdAt: string;
  deleted: any;
  email: string;
  isAdmin: boolean;
  name: string;
  slug: string;
  state: boolean;
  updatedAt: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = new BehaviorSubject<User | undefined>(undefined);
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(public storageService: StorageService) {}

  public getAuth() {
    return this._auth.value;
  }

  public setAuth(value: User) {
    this._auth.next(value);
  }

  public get isLoggedIn() {
    return this._isLoggedIn.value;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  public get authObservable(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }
}
