import { Component, Input } from '@angular/core';

import { Todo } from '../todo/todo.component'

import 'reflect-metadata';
import { Type, plainToClass } from 'class-transformer';

export class Project {
  title: string;

  @Type(() => Todo) // Using decorator for nested convertions
  todos: Todo[];

  constructor(title: string, todos: Todo[]) {
    this.title = title;
    this.todos = todos;
  }
}

export function projectsFromDataArray(data: any[]): Project[] {
  let result: Project[] = [];
  data.forEach((projectData) => { result.push(plainToClass(Project, projectData)); });
  return result;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project: Project
}
