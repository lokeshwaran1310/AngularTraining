import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService {
  private apiUrl='http://localhost:8084/auth/login';
  constructor(private http:HttpClient) { }

  login(username:string,password:string): Observable<any>{
    return this.http.post<any>(this.apiUrl,{username,password}).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
         return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }



}