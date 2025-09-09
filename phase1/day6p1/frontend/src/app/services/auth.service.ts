import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService {
  private baseUrl = 'http://localhost:8081/auth';
  constructor(private http:HttpClient) { }

  login(username:string,password:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/login`,{username,password}).pipe(
      catchError((error) => {
         return throwError(() => error);
      })
    );
  }

  register(username:string,password:string,role:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register`,{username,password,role}).pipe(
      catchError((error) => {
         return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const payload = this.parseJwtPayload(token);
    if (!payload) return false;
    
    const expiration = payload.exp * 1000;
    return Date.now() < expiration;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  private parseJwtPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwtPayload(token);
      return payload?.role || null;
    }
    return null;
  }

}