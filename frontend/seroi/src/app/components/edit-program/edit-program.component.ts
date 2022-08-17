import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProgramService} from "../../services/program.service";
import {HttpResponse} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Project} from "../../classes/project";

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router: Router, private programService: ProgramService) { }

  selectedId: string = '';
  new : boolean = false;
  _id: string = '';
  name = new FormControl('');
  description = new FormControl('');
  startDate = new FormControl('');
  childProjects: Project[] = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.selectedId = params['id'];
        //if there is no selectedId then it is a new program
        if(this.selectedId == undefined){
          this.new = true;
        }
        else{
          this.programService.getProgram(this.selectedId).subscribe(
            (result: any) => {
              if (result instanceof HttpResponse) {
                this._id = result.body._id;
                this.name.setValue(result.body.name);
                this.description.setValue(result.body.description);
                let formattedDate = formatDate(result.body.startDate, 'yyyy-MM-dd', 'en-US');
                this.startDate.setValue(formattedDate);
                this.childProjects = result.body.childProjects;
              }
            },
            (err: any) => {
              console.error(err)

            });
        }
      }
    );
  }

  saveProgram(){
    if(!this.new){
      this.programService.editProgram(this.selectedId, {"name": this.name.value, "description": this.description.value, "startDate": this.startDate.value, "childProjects": this.childProjects}).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            console.log(result.body)
          }
        },
        (err: any) => {
          console.error(err)
        });
    }
    else{
      this.programService.createProgram({"name": this.name.value, "description": this.description.value, "startDate": this.startDate.value, "childProjects": this.childProjects}).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            console.log(result.body);
          }
        },
        (err: any) => {
          console.error(err)
        });
    }
    console.log(this.new);
  }

  deleteProgram(){
    if(confirm("Are you sure you want to delete this program?")){
      this.programService.deleteProgram(this.selectedId).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            console.log(result.body);
          }
        }
      );
    }
  }

  editProject(project: string) {
    if(confirm("Save the project changes before editing the project?")){
      this.saveProgram();
    }
    this.router.navigate(['/projects/edit'], {queryParams: { id: project, parentId: this.selectedId }});
  }
  addProject() {
    if(confirm("Save the project changes before adding a new project?")){
      this.saveProgram();
    }
    this.router.navigate(['/projects/edit'], {queryParams: { parentId: this.selectedId }});
  }

}
