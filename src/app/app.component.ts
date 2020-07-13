import { Component, OnInit } from '@angular/core';

import { plainToClass, classToPlain } from 'class-transformer';

import { Project } from './project/project.component';

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
    this.reloadProjectsList();
  }

  reloadProjectsList() {
    console.debug('Loading projects from database');
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(d => plainToClass(Project, d));
    console.debug('Loaded projects:', this.projects);
    }, error => {
      console.error(error);
    });
  }

  projectTrackByFn(index: number, project: Project): number {
    return project.id;
  }

  onReloadButtonClick() {
    this.reloadProjectsList();
  }

  onCreateNewProject(project) {
    console.debug('Creating new project:', project);
    this.projectService.postProject(project).subscribe(response => {
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
