import { Component, Input } from '@angular/core';

import { Todo } from '../todo/todo.component'

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
}
