import { DmcService } from 'src/app/services/dmc.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private dmc: DmcService) {}

  apiUrl: any = 'http://127.0.0.1:3001/';
  // apiUrl: any = 'https://dmc-dashboard.vercel.app/';
  // get(url: any) {
  //   return this.http.get(this.apiUrl + url);
  // }
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

  get(api: string): Observable<any> {
    let localData: any = this.dmc.data[api];
    if (localData) {
      return localData;
    }

    return this.http.get(this.apiUrl + api).pipe(
      map((data: any) => {
        // Save data in session cookie
        this.dmc.data[api] = new BehaviorSubject(data);
        // this.dmc.data[api].next(data);
        return data; // Return the fetched data
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
