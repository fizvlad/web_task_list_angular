import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

import { environment } from 'src/environments/environment'

import { Todo } from '../todo/todo.component'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  INTERNAL_API_URL: string = environment.internalApiUrl;

  constructor(private httpClient: HttpClient) { }

  public postTodo(todo: Todo): Observable<HttpResponse<void>> {
    // NOTE: Observing HttpResponse since Location header should contain important info
    return this.httpClient.post<void>(
      `${this.INTERNAL_API_URL}/todos`,
      classToPlain(todo),
      {observe: 'response'}
    );
  }

  public patchTodo(todo: Todo): Observable<object> {
    return this.httpClient.patch<object>(
      `${this.INTERNAL_API_URL}/projects/${todo.projectId}/todo/${todo.id}`,
      classToPlain(todo)
    );
  }
}
