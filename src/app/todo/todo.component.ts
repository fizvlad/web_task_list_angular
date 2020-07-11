import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'reflect-metadata';
import { Type, plainToClass } from 'class-transformer';

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
  @Output() onCreateNewTodo = new EventEmitter();

  newTodoReactiveForm: FormGroup;

  constructor(private form_builder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  onTodoStatusChange(todo: Todo, project: Project) {
    console.debug('Toggling status of', todo, 'in', project);
    todo.toggleCompleted();
    // TODO: Send data to server or whatever
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

    let newTodo = new Todo(this.newTodoReactiveForm.value['text'], false);
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
