import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationResponse } from '../models/authorization.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  postInLocalStorage(authentication: AuthorizationResponse): void {
    localStorage.setItem('accessToken', authentication.data.accessToken);
    localStorage.setItem('expiresIn', authentication.data.expiresIn);
    localStorage.setItem('fullName', authentication.data.user.fullName);
  }

  authenticate(
    email: string,
    password: string
  ): Observable<AuthorizationResponse> {
    const { host } = environment;
    const body = {
      email,
      password,
    };
    return this.http.post<AuthorizationResponse>(
      `${host}/v1/mobile/auth`,
      body
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    const expiresIn = localStorage.getItem('expiresIn');
    const expirationDate = new Date(expiresIn!);
    if (token && expirationDate >= new Date()) return true;
    return false;
  }

  clearStorage(): void {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('expiresIn', '');
    localStorage.setItem('fullName', '');
  }
}
