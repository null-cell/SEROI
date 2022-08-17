import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProgramService} from "../../services/program.service";
import {FormControl} from "@angular/forms";
import {StakeholderSubschema} from "../../classes/stakeholder-subschema";
import {HttpResponse} from "@angular/common/http";
import {ProjectService} from "../../services/project.service";
import {formatDate} from "@angular/common";
import {Program} from "../../classes/program";


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router: Router, private programService: ProgramService, private projectService: ProjectService) { }

  selectedId: string = '';
  parentId: string = '';
  new : boolean = false;
  _id: string = '';
  name = new FormControl('');
  description = new FormControl('');
  startDate = new FormControl('');
  stakeholders: StakeholderSubschema[] = [];
  parentProgramName = new FormControl('');
  programs: Program[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.selectedId = params['id'];
        this.parentId = params['parentId'];

        //if there is no selectedId then it is a new project
        if(this.selectedId == undefined){
          this.new = true;

        }
        //otherwise it is an existing project that we want to edit
        else{
          this.projectService.getProject(this.selectedId).subscribe(
            (result: any) => {
              if (result instanceof HttpResponse) {
                this._id = result.body._id;
                this.name.setValue(result.body.name);
                this.description.setValue(result.body.description);
                let formattedDate = formatDate(result.body.startDate, 'yyyy-MM-dd', 'en-US');
                this.startDate.setValue(formattedDate);
                this.stakeholders = result.body.stakeholders;
                if(result.body.parentProgram){
                  this.parentId = result.body.parentProgram;
                  this.programService.getProgram(this.parentId).subscribe(
                    (result: any) => {
                      if (result instanceof HttpResponse) {
                        this.parentProgramName.setValue(result.body.name);
                      }
                    });
                }
              }
            },
            (err: any) => {
              console.error(err)

            });
        }
        if(this.parentId != undefined && this.new){
          this.programService.getProgram(this.parentId).subscribe(
            (result: any) => {
              if (result instanceof HttpResponse) {
                this.parentProgramName.setValue(result.body.name);
              }
            });
        }
      }
    );
    this.programService.getAllPrograms().subscribe(
      (result: any) => {
        if (result instanceof HttpResponse) {
          this.programs = result.body;
        }
      });
  }

  saveProject(){
    let project:any = {"name": this.name.value, "description": this.description.value, "startDate": this.startDate.value, "stakeholders": this.stakeholders};
    if(this.parentId != undefined){
      project.parentProgram = this.parentId;
    }
    if(!this.new){
      this.projectService.editProject(this.selectedId, project).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            console.log(result.body);
          }
        },
        (err: any) => {
          console.error(err)
        }
      );
    }
    else{
      this.projectService.createProject(project).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            console.log(result.body);
          }
        },
        (err: any) => {
          console.error(err)
        }
      );
    }
  }
  deleteProject(){
    if(confirm("Are you sure you want to delete this project?")){
      this.projectService.deleteProject(this.selectedId).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            this.router.navigate(['/projects']);
          }
        }
      );
    }
  }

  editStakeholder(i: number){
    this.router.navigate(['/projects/stakeholders/edit'], {queryParams: { id: this.stakeholders[i].stakeHolder._id, parentId: this.selectedId }});
  }
  addStakeholder(){
    this.router.navigate(['/projects/stakeholders/edit'], {queryParams: { parentId: this.selectedId }});
  }

}
