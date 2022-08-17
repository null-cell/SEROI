export class Stakeholder {
  _id: string;
  name: string;
  description: string;
  type: string;

  constructor(_id: string, name: string, description: string, type: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.type = type;
  }

}
