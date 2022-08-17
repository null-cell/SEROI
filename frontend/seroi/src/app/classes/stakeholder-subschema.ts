import {Stakeholder} from "./stakeholder";
import {InputSubschema} from "./input-subschema";
import {OutputProxySubschema} from "./output-proxy-subschema";

export class StakeholderSubschema {
  stakeHolder: Stakeholder;
  inputs: InputSubschema[];
  outputs: OutputProxySubschema[];

  constructor(stakeHolder: Stakeholder, inputs: InputSubschema[], outputs: OutputProxySubschema[]) {
    this.stakeHolder = stakeHolder;
    this.inputs = inputs;
    this.outputs = outputs;
  }

}
