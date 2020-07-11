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
    this.projectService.getProjects().subscribe(data => {
      this.projects = projectsFromDataArray(data);
    console.debug('Loaded projects:', this.projects);
    }, error => {
      console.error(error);
    });
  }

  onCreateNewProject(project) {
    console.debug('Creating new project:', project);
    let data = projectToData(project);
    this.projectService.postProject(data).subscribe(response => {
      let location: string;
      let new_id: number;
      try {
        location = response.headers.get('location');
        new_id = +location.match(/\/projects\/(\d+)/)[1];
      } catch {
        console.error('Failed to retrieve new id from', response);
      }
      project.id = new_id;
      this.projects.push(project);
    }, error => {
      console.error(error);
    });
  }
}
