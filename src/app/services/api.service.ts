import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiUrl: any = 'http://127.0.0.1:3001/';
  get(url: any) {
    return this.http.get(this.apiUrl + url);
  }
  post(url: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, JSON.stringify(data));
  }
  put(url: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + url, JSON.stringify(data));
  }
  patch(url: any, data: any): Observable<any> {
    return this.http.patch(this.apiUrl + url, JSON.stringify(data));
  }
  delete(url: any): Observable<any> {
    return this.http.delete(this.apiUrl + url);
  }
}
