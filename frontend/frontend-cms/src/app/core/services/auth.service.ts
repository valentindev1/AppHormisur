import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  //  LOGIN
  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/login`, { email, password })
      .pipe(
        tap(res => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  //  LOGOUT
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  //  OBTENER TOKEN
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  //  DECODIFICAR TOKEN
  private decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  //  EMAIL
  getEmail(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  //  ROLE
  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded?.role || null;
  }

  //  EXPIRACIÓN
  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;

    return decoded.exp < Date.now() / 1000;
  }

  //  LOGUEADO
  isLogged(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired();
  }
}
