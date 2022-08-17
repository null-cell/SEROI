import {Component, OnInit} from '@angular/core';
import {Program} from "../../classes/program";
import {ProgramService} from "../../services/program.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  public error: string = '';
  public programs: Program[] = [];

  constructor(private programService: ProgramService, private router: Router) {

  }

  ngOnInit(): void {
    this.programService.getAllPrograms().subscribe(
      (result) => {
        if (result instanceof HttpResponse) {
          this.programs = result.body
        }
      },
      (err) => {
        this.error = err.message
      }
    )
  }

  editProgram(program: string) {
    this.router.navigate(['/programs/edit'], {queryParams: { id: program }});
  }

  addProgram() {
    this.router.navigate(['/programs/edit']);
  }
}
