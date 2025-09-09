import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, map } from "rxjs";
import { AuthService } from "./auth.service";

export interface Bug{
    id:number;
    title:string;
    assignee:string;
    status:string;
    project:string;
}
@Injectable({providedIn:'root'})
export class BugService{
    private baseUrl = 'http://localhost:8081';
    constructor(private http:HttpClient, private authService: AuthService){

    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }
    getBugs():Observable<Bug[]>{
        return this.http.get<Bug[]>(`${this.baseUrl}/bugs/all`).pipe(
            catchError((error) => {
                return throwError(() => new Error("failed to load"));
            })
        );
    }

    getBugById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`${this.baseUrl}/bugs/title/${id}`).pipe(
            catchError((error) => {
                return throwError(() => new Error("Bug not found"));
            })
        );
    }

    searchBugs(title?: string, status?: string, assignee?: string): Observable<Bug[]> {
        let params = new URLSearchParams();
        if (title) params.append('title', title);
        if (status) params.append('status', status);
        if (assignee) params.append('assignee', assignee);
        
        const searchUrl = `${this.baseUrl}/bugs/search?${params.toString()}`;
        return this.http.get<any>(searchUrl).pipe(
            map(response => response.content || response),
            catchError((error) => {
                return throwError(() => new Error("Search failed"));
            })
        );
    }

    createBug(bug: Bug): Observable<string> {
        const headers = this.getAuthHeaders();
        return this.http.post(`${this.baseUrl}/admin`, bug, { headers, responseType: 'text' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    updateBug(id: number, bug: Bug): Observable<string> {
        const headers = this.getAuthHeaders();
        return this.http.put(`${this.baseUrl}/admin/${id}`, bug, { headers, responseType: 'text' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    deleteBug(id: number): Observable<string> {
        const headers = this.getAuthHeaders();
        return this.http.delete(`${this.baseUrl}/admin/${id}`, { headers, responseType: 'text' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    updateBugStatus(id: number, status: string): Observable<string> {
        const headers = this.getAuthHeaders();
        return this.http.put(`${this.baseUrl}/developer/status/${id}`, JSON.stringify(status), { headers, responseType: 'text' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

}