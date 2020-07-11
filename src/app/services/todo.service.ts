import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment'

import { Project } from '../project/project.component'
import { Todo } from '../todo/todo.component'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  INTERNAL_API_URL: string = environment.internalApiUrl;

  constructor(private httpClient: HttpClient) { }

  public postTodo(todo: Todo, project: Project): Observable<HttpResponse<any>> {
    // NOTE: Observing HttpResponse since Location header should contain important info
    // NOTE: Mering Todo with { project_id: NUM } doesn't really seem nice.
    //   IMHO, proper way is to store reference to project in todo and somehow
    //   include project id into plain object.
    return this.httpClient.post<any>(
      `${this.INTERNAL_API_URL}/todos`,
      Object.assign(todo, {project_id: project.id}),
      {observe: 'response'}
    );
  }

  public patchTodo(todo: Todo, project: Project): Observable<HttpResponse<any>> {
    return this.httpClient.patch<any>(
      `${this.INTERNAL_API_URL}/projects/${project.id}/todo/${todo.id}`,
      Object.assign(todo, {project_id: project.id})
    );
  }
}
