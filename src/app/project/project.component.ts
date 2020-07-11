import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'reflect-metadata';
import { Type, plainToClass, classToPlain } from 'class-transformer';

import { Todo } from '../todo/todo.component'

import { TodoService } from '../services/todo.service';

export class Project {
  id: number;
  title: string;

  @Type(() => Todo) // Using decorator for nested convertions
  todos: Todo[];

  constructor(id: number, title: string, todos: Todo[]) {
    this.id = id;
    this.title = title;
    this.todos = todos;
  }
}

export function projectsFromDataArray(data: any[]): Project[] {
  let result: Project[] = [];
  data.forEach((projectData) => { result.push(plainToClass(Project, projectData)); });
  return result;
}

export function projectToData(project: Project): any {
  return classToPlain(project);
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

  constructor(private form_builder: FormBuilder, private todoService: TodoService) { }

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

    let newProject = new Project(undefined, this.newProjectReactiveForm.value['title'], []);
    this.onCreateNewProject.emit(newProject);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    this.newProjectReactiveForm.reset();
  }

  onCreateNewTodo(todo) {
    console.debug('Creating new todo:', todo);
    this.todoService.postTodo(todo, this.project).subscribe(response => {
      let location: string;
      let new_id: number;
      try {
        location = response.headers.get('location');
        new_id = +location.match(/\/todos\/(\d+)/)[1];
      } catch {
        console.error('Failed to retrieve new id from', response);
      }
      todo.id = new_id;
      this.project.todos.push(todo);
    }, error => {
      console.error(error);
    });
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
