const mongoose = require('mongoose');


const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    childProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }]
});


mongoose.model('Programs', programSchema, 'Programs');
