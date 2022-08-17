const mongoose = require('mongoose');

const stakeholders = mongoose.model('Stakeholders');

//get all stakeholders
const getAllStakeholders = (req, res) => {
    stakeholders
        .find()
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "No document found in stakeholders collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//create a new stakeholder
const createStakeholder = (req, res) => {
    const newStakeholder = new stakeholders({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type
    });
    newStakeholder.save((cbError, results) => {
        if (!results) {
            return res.status(404).json({
                "errMsg":
                    "The document could not be created in stakeholders collection"
            });
        } else if (cbError) {
            return res.status(500).json(cbError);
        }
        res.status(200).json(results);
    });
}

//edit a stakeholder
const editStakeholder = (req, res) => {
    stakeholders
        .findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type
        }, {
            new: true
        }, (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in stakeholders collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//delete a stakeholder
const deleteStakeholder = (req, res) => {
    stakeholders
        .findByIdAndRemove(req.params.id, (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in stakeholders collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//get a stakeholder
const getStakeholder = (req, res) => {
    stakeholders
        .findById(req.params.id)
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in stakeholders collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}


module.exports = {
    getAllStakeholders,
    createStakeholder,
    editStakeholder,
    deleteStakeholder,
    getStakeholder
}