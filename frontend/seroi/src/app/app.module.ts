import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProgramComponent } from './components/program/program.component';
import { ProjectComponent } from './components/project/project.component';
import { StakeholderComponent } from './components/stakeholder/stakeholder.component';
import {ProgramService} from "./services/program.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditProgramComponent } from './components/edit-program/edit-program.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {ProjectService} from "./services/project.service";
import {StakeholderService} from "./services/stakeholder.service";
import { EditSingleStakeholderComponent } from './components/edit-single-stakeholder/edit-single-stakeholder.component';
import { EditSubschemaStakeholderComponent } from './components/edit-subschema-stakeholder/edit-subschema-stakeholder.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingComponent,
    ProgramComponent,
    ProjectComponent,
    StakeholderComponent,
    EditProgramComponent,
    EditProjectComponent,
    EditSingleStakeholderComponent,
    EditSubschemaStakeholderComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    ProgramService,
    ProjectService,
    StakeholderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
