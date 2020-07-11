import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient) { }

  public getProjects(): Observable<any> {
    // TODO: Something like return this.httpClient.get(`${process.env.INTERNAL_API_URL}/projects`);
    return this.httpClient.get(`http://localhost:3000/projects`);
  }
}
