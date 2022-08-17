const mongoose = require('mongoose');


const stakeholderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }
});


mongoose.model('Stakeholders', stakeholderSchema, 'Stakeholders');
