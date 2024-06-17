import { DmcService } from 'src/app/services/dmc.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private dmc: DmcService) {}

  // apiUrl: any = 'http://127.0.0.1:3001/';
  apiUrl: any = 'https://dmc-dashboard.vercel.app/';

  post(url: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data);
  }
  put(url: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + url, data);
  }
  patch(url: any, data: any, option: any = null): Observable<any> {
    return this.http.patch(this.apiUrl + url, data, option ? option : '');
  }
  delete(url: any, option: any = null): Observable<any> {
    return this.http.delete(this.apiUrl + url, option ? option : '');
  }

  get(api: string, option: any = null): Observable<any> {
    let localData: any = this.dmc.data[api];
    if (localData) {
      return localData;
    }
    return this.http.get(this.apiUrl + api, option ? option : '').pipe(
      map((data: any) => {
        // Save data in session cookie
        this.dmc.data[api] = new BehaviorSubject(data);
        return data; // Return the fetched data
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
