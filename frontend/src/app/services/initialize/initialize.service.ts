import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';
import { Initialize } from './initialize';

@Injectable({
  providedIn: 'root',
})
export class InitializeService extends HttpService<Initialize> {
  constructor(
    override http: HttpClient,
    public override storageService: StorageService
  ) {
    super(http, storageService);
    this.setApi = 'initialize';
  }

  public initialize(): Observable<Initialize> {
    return this.findOne();
  }
}
