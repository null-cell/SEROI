import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {ProgramComponent} from "./components/program/program.component";
import {ProjectComponent} from "./components/project/project.component";
import {StakeholderComponent} from "./components/stakeholder/stakeholder.component";
import {EditProgramComponent} from "./components/edit-program/edit-program.component";
import {EditProjectComponent} from "./components/edit-project/edit-project.component";
import {EditSingleStakeholderComponent} from "./components/edit-single-stakeholder/edit-single-stakeholder.component";
import {
  EditSubschemaStakeholderComponent
} from "./components/edit-subschema-stakeholder/edit-subschema-stakeholder.component";

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'programs', component: ProgramComponent},
  { path: 'projects', component: ProjectComponent},
  { path: 'stakeholders', component: StakeholderComponent},
  { path: 'programs/edit', component: EditProgramComponent},
  { path: 'projects/edit', component: EditProjectComponent},
  { path: 'projects/stakeholders/edit', component: EditSubschemaStakeholderComponent},
  { path: 'stakeholders/edit', component: EditSingleStakeholderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
