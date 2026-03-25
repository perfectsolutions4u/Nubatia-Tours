import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  userdata: any;
  private accessToken = signal<string | null>(null);
  readonly isLoggedInSignal = computed(() => !!this.accessToken());

  constructor(
    protected override HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(HttpClient);

    // Initialize token signal once (browser-only).
    if (this.isBrowser) {
      this.accessToken.set(localStorage.getItem('accessToken'));
    }
  }

  private get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('accessToken', token);
    }
    this.accessToken.set(token);
  }
  getToken(): string | null {
    return this.accessToken();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      // مسح favouriteIds عند تسجيل الخروج
      localStorage.removeItem('favouriteIds');
    }
    this.accessToken.set(null);
    this.userdata = null;
  }

  setRegister(userData: object): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/auth/register`, userData);
  }

  setlogin(userData: object): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/auth/login`, userData);
  }

  setForgetPass(userEmail: any): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/auth/password/forget`, {
      email: userEmail,
    });
  }

  setOTP(userData: object): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/auth/password/otp/verify`, userData);
  }
}
