const mongoose = require('mongoose');

const outputProxySubschema = new mongoose.Schema({
    outputProxy: { type: mongoose.Schema.Types.ObjectId, ref: 'OutputProxy' },
    quantity: { type: Number, required: true }
});

const inputSubschema = new mongoose.Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true }
});

const stakeHolderSubschema = new mongoose.Schema({
    stakeHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'Stakeholders' },
    inputs: [inputSubschema],
    outputs: [outputProxySubschema]
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    stakeholders: [stakeHolderSubschema],
    parentProgram: { type: mongoose.Schema.Types.ObjectId, ref: 'Programs', required: false }
});

mongoose.model('Projects', projectSchema, 'Projects');
