import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

import { environment } from 'src/environments/environment'

import { Project } from '../project/project.component'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  INTERNAL_API_URL: string = environment.internalApiUrl;

  constructor(private httpClient: HttpClient) { }

  public getProjects(): Observable<object[]> {
    return this.httpClient.get<object[]>(`${this.INTERNAL_API_URL}/projects`);
  }

  public postProject(project: Project): Observable<HttpResponse<void>> {
    // NOTE: Observing HttpResponse since Location header should contain important info
    return this.httpClient.post<void>(`${this.INTERNAL_API_URL}/projects`, classToPlain(project), {observe: 'response'});
  }
}
