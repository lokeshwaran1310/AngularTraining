import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, map } from "rxjs";

export interface Bug{
    id:number;
    title:string;
    assignee:string;
    status:string;
    project:string;
}
@Injectable({providedIn:'root'})
export class BugService{
    private apiUrl:string="http://localhost:8088/bugs/all";
    constructor(private http:HttpClient){

    }
    getBugs():Observable<Bug[]>{
        return this.http.get<Bug[]>(this.apiUrl).pipe(
            catchError((error) => {
                console.error('Error fetching bugs:', error);
                return throwError(() => new Error("failed to load"));
            })
        );
    }

    getBugById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`http://localhost:8085/bugs/title/${id}`).pipe(
            catchError((error) => {
                console.error('Error fetching bug by ID:', error);
                return throwError(() => new Error("Bug not found"));
            })
        );
    }

    searchBugs(title?: string, status?: string, assignee?: string): Observable<Bug[]> {
        let params = new URLSearchParams();
        if (title) params.append('title', title);
        if (status) params.append('status', status);
        if (assignee) params.append('assignee', assignee);
        
        const searchUrl = `http://localhost:8085/bugs/search?${params.toString()}`;
        return this.http.get<any>(searchUrl).pipe(
            map(response => response.content || response),
            catchError((error) => {
                console.error('Error searching bugs:', error);
                return throwError(() => new Error("Search failed"));
            })
        );
    }


}