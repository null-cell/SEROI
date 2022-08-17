const mongoose = require('mongoose');

const programs = mongoose.model('Programs')


const allPrograms = (req, res) => { // get all programs
    programs
        .find()
        .populate('childProjects')
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "No document found in programs collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//get program
const getProgram = (req, res) => {
    programs
        .findById(req.params.id)
        .populate('childProjects')
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in programs collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//create a new program
const createProgram = (req, res) => {
    console.log(req.body)
    const newProgram = new programs({
        name: req.body.name,
        description: req.body.description,
        childProjects: req.body.childProjects
    });
    if(req.body.startDate) {
        newProgram.startDate = req.body.startDate;
    }
    newProgram.save((cbError, results) => {
        if (!results) {
            return res.status(404).json({
                "errMsg":
                    "The document could not be created in programs collection"
            });
        } else if (cbError) {
            return res.status(500).json(cbError);
        }
        res.status(200).json(results);
    });
}

//edit a program
const editProgram = (req, res) => {
    programs
        .findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            childProjects: req.body.childProjects
        }, {
            new: true
        }, (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in programs collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

//delete a program
const deleteProgram = (req, res) => {
    programs
        .findByIdAndRemove(req.params.id, (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Deleting the program failed"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

module.exports = {
    allPrograms,
    createProgram,
    editProgram,
    deleteProgram,
    getProgram
    
}