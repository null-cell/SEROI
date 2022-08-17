import {OutputProxy} from "./output-proxy";

export class OutputProxySubschema {
  outputProxy: OutputProxy;
  quantity: number;

  constructor(outputProxy: OutputProxy, quantity: number) {
    this.outputProxy = outputProxy;
    this.quantity = quantity;
  }
}
