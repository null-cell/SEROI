import { Component, OnInit } from '@angular/core';
import {Program} from "../../classes/program";
import {Stakeholder} from "../../classes/stakeholder";
import {StakeholderService} from "../../services/stakeholder.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-single-stakeholder',
  templateUrl: './edit-single-stakeholder.component.html',
  styleUrls: ['./edit-single-stakeholder.component.css']
})
export class EditSingleStakeholderComponent implements OnInit {


  public stakeholders: Stakeholder[] = [];
  selectedId: string = '';
  new : boolean = false;
  _id: string = '';
  name = new FormControl('');
  description = new FormControl('');
  type = new FormControl('');

  constructor(private stakeholderService: StakeholderService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.selectedId = params['id'];
        //if there is no selectedId then it is a new stakeholder

        if(this.selectedId == undefined){
          this.new = true;
        }
        else{
          this.stakeholderService.getStakeholder(this.selectedId).subscribe(
            (result: any) => {
              if (result instanceof HttpResponse) {
                this._id = result.body._id;
                this.name.setValue(result.body.name);
                this.description.setValue(result.body.description);
                this.type.setValue(result.body.type);
              }
            },
            (err: any) => {
              console.error(err)

            });
        }
      });
  }
  saveStakeholder(){
    if(!this.new){
      this.stakeholderService.editStakeholder(this.selectedId, {"name": this.name.value, "description": this.description.value, "type": this.type.value}).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            this.router.navigate(['/stakeholders']);
          }
        }
      );
    }
    else{
      this.stakeholderService.createStakeholder({"name": this.name.value, "description": this.description.value, "type": this.type.value}).subscribe(
        (result: any) => {
          if (result instanceof HttpResponse) {
            this.router.navigate(['/stakeholders']);
          }
        }
      );
    }
  }
  deleteStakeholder(){
    this.stakeholderService.deleteStakeholder(this.selectedId).subscribe(
      (result: any) => {
        if (result instanceof HttpResponse) {
          this.router.navigate(['/stakeholders']);
        }
      }
    );
  }
}
