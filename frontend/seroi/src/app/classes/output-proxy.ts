export class OutputProxy {
  _id: string;
  nameOfField: string;
  indicatorName: string;
  proxyName: string;
  proxyDescription: string;
  financialProxyValue: number;
  unitOfMeasurement: string;
  outcomeIntendedness: string;
  outcomePolarity: string;
  sourceUrl: string;
  sourceCitation: string;
  sourceCountry: string;
  sourceYear: number;
  defaultLeakage: number;
  defaultDeadweight: number;
  defaultAttribution: number;
  defaultYearlyDropoff: number;
  defaultDisplacement: number;

  constructor(_id: string, nameOfField: string, indicatorName: string, proxyName: string, proxyDescription: string, financialProxyValue: number, unitOfMeasurement: string, outcomeIntendedness: string, outcomePolarity: string, sourceUrl: string, sourceCitation: string, sourceCountry: string, sourceYear: number, defaultLeakage: number, defaultDeadweight: number, defaultAttribution: number, defaultYearlyDropoff: number, defaultDisplacement: number) {
    this._id = _id;
    this.nameOfField = nameOfField;
    this.indicatorName = indicatorName;
    this.proxyName = proxyName;
    this.proxyDescription = proxyDescription;
    this.financialProxyValue = financialProxyValue;
    this.unitOfMeasurement = unitOfMeasurement;
    this.outcomeIntendedness = outcomeIntendedness;
    this.outcomePolarity = outcomePolarity;
    this.sourceUrl = sourceUrl;
    this.sourceCitation = sourceCitation;
    this.sourceCountry = sourceCountry;
    this.sourceYear = sourceYear;
    this.defaultLeakage = defaultLeakage;
    this.defaultDeadweight = defaultDeadweight;
    this.defaultAttribution = defaultAttribution;
    this.defaultYearlyDropoff = defaultYearlyDropoff;
    this.defaultDisplacement = defaultDisplacement;
  }

}
