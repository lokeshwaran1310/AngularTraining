import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService {
  private apiUrl='http://localhost:8080/auth/login';
  constructor(private http:HttpClient) { }

  login(username:string,password:string): Observable<any>{
    return this.http.post<any>(this.apiUrl,{username,password}).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
         return throwError(() => error);
      })
    );
  }

  register(username:string,password:string,role:string): Observable<any>{
    return this.http.post<any>('http://localhost:8080/auth/register',{username,password,role}).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
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
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiration;
    } catch (error) {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        //decode base64 to ASCII
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('JWT Payload:', payload);
        console.log('User Role:', payload.role);
        return payload.role;
      } catch (error) {
        console.error('Error parsing JWT token:', error);
        return null;
      }
    }
    return null;
  }

}