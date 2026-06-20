import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registerOptions(username: string) {
    return this.http.post(
      `${this.apiUrl}/register/options`,
      { username }
    );
  }

  registerVerify(payload: any) {
    return this.http.post(
      `${this.apiUrl}/register/verify`,
      payload
    );
  }

  loginOptions(username: string) {
    return this.http.post(
      `${this.apiUrl}/login/options`,
      { username }
    );
  }

  loginVerify(payload: any) {
    return this.http.post(
      `${this.apiUrl}/login/verify`,
      payload
    );
  }
}