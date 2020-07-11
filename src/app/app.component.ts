import { Component, OnInit } from '@angular/core';

import { Project, projectsFromDataArray, projectToData } from './project/project.component';

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
    let data = projectToData(project);
    this.projectService.postProject(data).subscribe(value => {
      this.projects.push(project);
    }, error => {
      console.error(error);
    });
  }
}
