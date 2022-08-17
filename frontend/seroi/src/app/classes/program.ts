import {Project} from "./project";

export class Program {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  childProjects: Project[];

  constructor(_id: string, name: string, description: string, startDate: Date, childProjects: Project[]) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.childProjects = childProjects;
  }
}
