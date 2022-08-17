export class InputSubschema {
  type: string;
  amount: number;

  constructor(type: string, amount: number) {
    this.type = type;
    this.amount = amount;
  }
}
