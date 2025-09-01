import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

export interface Bug{
    id:number;
    title:string;
    assignee:string;
    status:string;
    project:string;
}
@Injectable({providedIn:'root'})
export class BugService{
    private apiUrl:string="http://localhost:8082/bugs/all";
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


}