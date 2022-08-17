import { Component, OnInit } from '@angular/core';
import {Project} from "../../classes/project";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) { }
  public error: string = '';
  public projects: Project[] = [];

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (result) => {
        if (result instanceof HttpResponse) {
          this.projects = result.body
        }
      },
      (err) => {
        this.error = err.message
      });

  }

  editProject(project: string) {
    this.router.navigate(['/projects/edit'], {queryParams: { id: project }});
  }
  addProject() {
    this.router.navigate(['/projects/edit']);
  }

}
