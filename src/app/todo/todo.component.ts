import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'reflect-metadata';
import { Expose, plainToClass } from 'class-transformer';

import { Project } from '../project/project.component'

import { TodoService } from '../services/todo.service';

export class Todo {
  id: number;
  text: string;
  isCompleted: boolean;

  @Expose({ name: "project_id" })
  projectId: number;

  constructor(
    id: number,
    text: string,
    isCompleted: boolean,
    projectId: number
  ) {
    this.id = id;
    this.text = text;
    this.isCompleted = isCompleted;
    this.projectId = projectId;
  }

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
  @Output() onCreateNewTodo = new EventEmitter();

  newTodoReactiveForm: FormGroup;

  constructor(private form_builder: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.initForm();
  }

  onTodoStatusChange(todo: Todo) {
    console.debug('Toggling status of', todo);
    todo.toggleCompleted();
    this.todoService.patchTodo(todo).subscribe(response => {
      // Everything is fine
    }, error => {
      todo.toggleCompleted(); // Revert
      console.error(error);
    });
  }

  isControlInvalid(controlName: string): boolean {
    let control = this.newTodoReactiveForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let controls = this.newTodoReactiveForm.controls;

    // Mark all of controls as touched
    if (this.newTodoReactiveForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    let newTodo = new Todo(undefined, this.newTodoReactiveForm.value['text'], false, this.project.id);
    this.onCreateNewTodo.emit(newTodo);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    this.newTodoReactiveForm.reset();
  }

  private initForm() {
    this.newTodoReactiveForm = this.form_builder.group({
      text: [{value: '', disabled: this.project == null}, [
          Validators.required
        ]
      ]
    });
  }
}
