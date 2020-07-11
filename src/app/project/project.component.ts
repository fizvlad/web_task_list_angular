import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'reflect-metadata';
import { Type, plainToClass } from 'class-transformer';

import { Todo } from '../todo/todo.component'

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
export class ProjectComponent implements OnInit {
  @Input() project: Project
  @Output() onCreateNewProject = new EventEmitter();

  newProjectReactiveForm: FormGroup;

  constructor(private form_builder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  isControlInvalid(controlName: string): boolean {
    let control = this.newProjectReactiveForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let controls = this.newProjectReactiveForm.controls;

    // Mark all of controls as touched
    if (this.newProjectReactiveForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    let newProject = new Project(this.newProjectReactiveForm.value['title'], []);
    this.onCreateNewProject.emit(newProject);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    this.newProjectReactiveForm.reset();
  }

  onCreateNewTodo(todo) {
    console.debug('Creating new todo:', todo);
    // TODO: Send Todo to internal API
    this.project.todos.push(todo);
  }

  private initForm() {
    this.newProjectReactiveForm = this.form_builder.group({
      title: ['', [
          Validators.required,
          Validators.pattern(/[A-zА-я\d\s]+/)
        ]
      ]
    });
  }
}
