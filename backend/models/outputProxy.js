const mongoose = require('mongoose');


const outputProxySchema = new mongoose.Schema({
    nameOfField: { type: String, required: true },
    indicatorName: { type: String, required: true },
    proxyName: {type:String, required: true},
    proxyDescription: { type: String, required: true },
    financialProxyValue: { type: Number, required: true },
    defaultQuantity: { type: Number, required: true },
    unitOfMeasurement: { type: String, required: true },
    outcomeIntendedness: {type:String, required: true},
    outcomePolarity: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    sourceCitation: { type: String, required: true },
    sourceCountry: { type: String, required: true },
    sourceYear: { type: Number, required: true },
    defaultLeakage: { type: Number, required: true },
    defaultDeadweight: { type: Number, required: true },
    defaultAttribution: { type: Number, required: true },
    defaultYearlyDropoff: { type: Number, required: true },
    defaultDisplacement: { type: Number, required: true }
});


mongoose.model('OutputProxy', outputProxySchema, 'OutputProxy');
