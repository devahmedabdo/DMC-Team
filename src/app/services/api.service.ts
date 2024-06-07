import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // apiUrl: any = 'http://127.0.0.1:3001/';
  apiUrl: any = 'https://dmc-dashboard.vercel.app/';
  get(url: any) {
    return this.http.get(this.apiUrl + url);
  }
  post(url: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data);
  }
  put(url: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + url, data);
  }
  patch(url: any, data: any): Observable<any> {
    return this.http.patch(this.apiUrl + url, data);
  }
  delete(url: any): Observable<any> {
    return this.http.delete(this.apiUrl + url);
  }
}
