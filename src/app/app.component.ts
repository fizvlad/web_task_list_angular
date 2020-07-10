import { Component, OnInit } from '@angular/core';

import { Project } from './project/project.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'web-task-list-angular';
  projects: Project[] = [];

  ngOnInit() {
    console.debug('Loading projects from database')
    // TODO: Sample data. Should actually load from DB
    this.projects = [
      {
        title: 'Семья',
        todos: [
          {
            text: 'Купить молоко',
            isCompleted: false
          },
          {
            text: 'Заменить масло в двигателе до 23 апреля',
            isCompleted: false
          },
          {
            text: 'Отправить письмо бабушке',
            isCompleted: true
          },
          {
            text: 'Заплатить за квартиру',
            isCompleted: false
          },
          {
            text: 'Забрать обувь из ремонта',
            isCompleted: false
          }
        ]
      },
      {
        title: 'Работа',
        todos: [
          {
            text: 'Позвонить заказчику',
            isCompleted: true
          },
          {
            text: 'Отправить документы',
            isCompleted: true
          },
          {
            text: 'Заполнить отчет',
            isCompleted: false
          }
        ]
      },
      {
        title: 'Прочее',
        todos: [
          {
            text: 'Позвонить другу',
            isCompleted: false
          },
          {
            text: 'Подготовиться к поездке',
            isCompleted: false
          }
        ]
      },
    ];
  }
}
