import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Project } from '../project/project.component'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  INTERNAL_API_URL: string = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  public getProjects(): Observable<any> {
    return this.httpClient.get<any>(`${this.INTERNAL_API_URL}/projects`);
  }

  public postProject(project: Project): Observable<HttpResponse<any>> {
    // NOTE: Observing HttpResponse since Location header should contain important info
    return this.httpClient.post<any>(`${this.INTERNAL_API_URL}/projects`, project, {observe: 'response'});
  }
}
