import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  private api!: string;

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer `,
    }),
  };

  constructor(
    protected http: HttpClient,
    protected storageService: StorageService
  ) {}

  protected getHeaders(): HttpHeaders {
    return this.httpOptions.headers;
  }

  protected get getApi(): string {
    return this.api;
  }

  protected set setApi(value: string) {
    this.api = `/api/${value}`;
  }

  protected findOne(): Observable<T> {
    this.getToken();
    return this.http.get<T>(`${this.api}`, this.httpOptions);
  }

  protected findAll(url?: string): Observable<T> {
    this.getToken();
    return this.http.get<T>(
      url ? `${this.api}/${url}` : `${this.api}`,
      this.httpOptions
    );
  }

  protected post(data: T, url?: string): Observable<T> {
    this.getToken();
    return this.http.post<T>(
      url ? `${this.api}/${url}` : `${this.api}`,
      data,
      this.httpOptions
    );
  }

  protected getToken() {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.storageService.getToken || ''}`
    );
  }
}
