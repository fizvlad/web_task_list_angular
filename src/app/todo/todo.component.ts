import { Component, Input } from '@angular/core';

import { Project } from '../project/project.component'

export class Todo {
  constructor(public text: string, public isCompleted: boolean) {}

  toggleCompleted(): boolean {
    this.isCompleted = !this.isCompleted;
    return this.isCompleted;
  }
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
    console.debug('Toggling status of', todo, 'in', project);
    todo.toggleCompleted();
    // TODO: Send data to server or whatever
  }
}
