import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {StakeholderService} from "../../services/stakeholder.service";
import {HttpResponse} from "@angular/common/http";
import {Stakeholder} from "../../classes/stakeholder";

@Component({
  selector: 'app-stakeholder',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {

  error: string = '';
  stakeholders: Stakeholder[] = [];

  constructor(private stakeholderService: StakeholderService, private router: Router) { }

  ngOnInit(): void {
    this.stakeholderService.getAllStakeholders().subscribe(
      (result) => {
        if (result instanceof HttpResponse) {
          this.stakeholders = result.body
        }
      },
(err) => {
        this.error = err.message;

      });
  }

  editStakeholder(stakeholder: string) {
    this.router.navigate(['/stakeholders/edit'], {queryParams: { id: stakeholder }});
  }
  addStakeholder() {
    this.router.navigate(['/stakeholders/edit']);
  }

}
