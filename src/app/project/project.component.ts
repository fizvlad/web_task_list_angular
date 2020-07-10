import { Component, Input } from '@angular/core';

export interface Todo {
  text: string
  isCompleted: boolean
}

export interface Project {
  title: string
  todos: Todo[]
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project: Project

  OnTodoStatusChange(todo: Todo, project: Project) {
    todo.isCompleted = !todo.isCompleted
    // TODO: Send data to server or whatever
  }
}
