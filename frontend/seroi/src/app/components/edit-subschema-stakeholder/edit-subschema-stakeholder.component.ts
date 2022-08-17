import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {StakeholderService} from "../../services/stakeholder.service";
import {HttpResponse} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {Stakeholder} from "../../classes/stakeholder";
import {InputSubschema} from "../../classes/input-subschema";
import {OutputProxySubschema} from "../../classes/output-proxy-subschema";
import {Project} from "../../classes/project";
import {StakeholderSubschema} from "../../classes/stakeholder-subschema";

@Component({
  selector: 'app-edit-subschema-stakeholder',
  templateUrl: './edit-subschema-stakeholder.component.html',
  styleUrls: ['./edit-subschema-stakeholder.component.css']
})
export class EditSubschemaStakeholderComponent implements OnInit {

  constructor(private route : ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private stakeholderService: StakeholderService) { }

  id: string = '';
  parentId: string = '';
  new : boolean = false;
  stakeholder : Stakeholder | undefined;
  selectedIdStakeholder :  string  = '';
  inputs : InputSubschema[] = [];
  outputs: OutputProxySubschema[] = [];
  parentProject : Project | undefined;
  usedStakeholders: string[] = [];
  allStakeholders: Stakeholder[] = [];

  ngOnInit(): void {
    this.stakeholderService.getAllStakeholders().subscribe(
      (result: any) => {
        if (result instanceof HttpResponse) {
          this.allStakeholders = result.body;
          console.log(this.allStakeholders);
        }
      },
      (error) => {
        console.log(error);
      });
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['id'];
        this.parentId = params['parentId'];

        if(this.id == undefined){
          this.new = true;
        }
        else{
          this.projectService.getStakeholder(this.parentId, this.id).subscribe(
            (result: any) => {
              if (result instanceof HttpResponse) {
                this.stakeholder = result.body.stakeholder;
                this.selectedIdStakeholder = result.body.stakeholder._id;
                this.inputs = result.body.inputs;
                this.outputs = result.body.outputs;

              }
            },
            error => {
              console.log(error);
            });
        }
      }
    );
    this.projectService.getProject(this.parentId).subscribe(
      (result: any) => {
        if (result instanceof HttpResponse) {
          this.parentProject = result.body;
          result.body.stakeholders.forEach((stakeholder:StakeholderSubschema) => {
            this.usedStakeholders.push(stakeholder.stakeHolder._id);
          });
        }
      });
  }



  saveStakeholder(){
    this.stakeholderService.getStakeholder(this.selectedIdStakeholder).subscribe(
      (result: any) => {
        if (result instanceof HttpResponse) {
          this.stakeholder = result.body;
          if(!this.new){
            this.projectService.editStakeholder(this.parentId, this.id, {"stakeHolder": this.stakeholder, "inputs": this.inputs, "outputs": this.outputs}).subscribe(
              (result: any) => {
                if (result instanceof HttpResponse) {
                  this.router.navigate(['/project/edit'], {queryParams: {id: this.parentId}});
                }
              },
              error => {
                console.log(error);
              });
          }
          else{
            this.projectService.addStakeholder(this.parentId, {"stakeHolder": this.stakeholder, "inputs": this.inputs, "outputs": this.outputs}).subscribe(
              (result: any) => {
                if (result instanceof HttpResponse) {
                  this.router.navigate(['/project/edit'], {queryParams: {id: this.parentId}});
                }
              },
              error => {
                console.log(error);
              });
          }
        }
      },
      error => {
        console.log(error);
      }
    );

  }



}
