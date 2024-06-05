import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public BaseURL: string;

  constructor(private http: HttpClient) {
    this.BaseURL = environment.supabaseKey;
  }

  open(url = '') {
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  get(url = '', options = {}) {
    return this.http.get<any>(this.BaseURL + url, options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  
  delete(url = '') {
    return this.http.delete(this.BaseURL + url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  post(data:any, url = '') {
    return this.http.post<any>(this.BaseURL + url, data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  put(data:any, url = '') {
    return this.http.put(this.BaseURL + url, data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
