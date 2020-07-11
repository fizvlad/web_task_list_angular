import { Component, OnInit } from '@angular/core';

import { Project, projectsFromDataArray } from './project/project.component';

import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'web-task-list-angular';
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    console.debug('Loading projects from database');
    this.projectService.getProjects().subscribe(value => {
      this.projects = projectsFromDataArray(value);
    console.debug('Loaded projects:', this.projects);
    }, error => {
      console.error(error);
    });
  }

  onCreateNewProject(project) {
    console.debug('Creating new project:', project);
    // TODO: Send data tos server and validate that object was created
    this.projects.push(project);
  }
}
