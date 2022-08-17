import {StakeholderSubschema} from "./stakeholder-subschema";

export class Project {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  stakeholders: StakeholderSubschema[];
  parentProgram: string;

  constructor(_id: string, name: string, description: string, startDate: Date, stakeholders: StakeholderSubschema[], parentProgram: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.stakeholders = stakeholders;
    this.parentProgram = parentProgram;
  }

}
