import { Component, Input } from '@angular/core';

import { Project } from '../project/project.component'

export interface Todo {
  text: string
  isCompleted: boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: Todo
  @Input() project: Project

  OnTodoStatusChange(todo: Todo, project: Project) {
    todo.isCompleted = !todo.isCompleted;
    // TODO: Send data to server or whatever
  }
}
