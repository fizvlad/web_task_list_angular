import { Component, Input } from '@angular/core';

import { Todo } from '../todo/todo.component'

export class Project {
  constructor(public title: string, public todos: Todo[]) {}
}

export function projectsFromDataArray(data: any[]): Project[] {
  let result: Project[] = [];
  data.forEach((project_data) => {
    let todos: Todo[] = [];
    project_data['todos'].forEach((todo_data) => {
      todos.push(new Todo(todo_data['text'], todo_data['isCompleted']));
    });
    let project: Project = new Project(project_data['title'], todos);
    result.push(project);
  });
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
