const mongoose = require('mongoose');

const projects = mongoose.model('Projects');
const programs = mongoose.model('Programs');


const allProjects = (req, res) => {
    projects
        .find()
        //.populate('parentProgram') // populates the parentProgram field with the full document of the parentProgram (add if needed later)
        .populate({
            path: 'stakeholders.stakeHolder',
            model: 'Stakeholders'
        })
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "No document found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

const getProject = (req, res) => {
    projects
        .findById(req.params.id)
        // .populate('parentProgram')
        .populate({
            path: 'stakeholders.stakeHolder',
            model: 'Stakeholders'
        })
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

const editProject = (req, res) => {
    projects
        .findByIdAndUpdate(req.params.id, req.body, {new: true})
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

const deleteProject = (req, res) => {
    projects
        .findByIdAndRemove(req.params.id)
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            //remove this project from the parentProgram's childProjects array
            if (results.parentProgram) {
                programs
                    .findByIdAndUpdate(results.parentProgram, {
                        $pull: {
                            childProjects: results._id
                        }
                    }, {
                        new: true
                    }, (cbError2, results2) => {
                        if (!results2) {
                            return res.status(404).json({
                                "errMsg":
                                    "Parent document could not be found in programs collection"
                            });
                        } else if (cbError2) {
                            return res.status(500).json(cbError2);
                        }
                        res.status(200).json(results2);
                    });
            }
        });
}

const createProject = (req, res) => {
    const newProject = new projects({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        stakeholders: req.body.stakeholders
    })
    if (req.body.parentProgram) {
        newProject.parentProgram = req.body.parentProgram;
    }
    newProject.save((cbError, results) => {
        if (!results) {
            return res.status(404).json({
                "errMsg":
                    "The document could not be created in projects collection"
            });
        } else if (cbError) {
            return res.status(500).json(cbError);
        }
        if (req.body.parentProgram) {
            // add this project to the parentProgram's childProjects array
            programs
                .findByIdAndUpdate(req.body.parentProgram, {
                    $push: {
                        childProjects: newProject._id
                    }
                }, {
                    new: true
                }, (cbError2, results2) => {
                    if (!results2) {
                        return res.status(404).json({
                            "errMsg":
                                "Parent document could not be found in programs collection"
                        });
                    } else if (cbError2) {
                        return res.status(500).json(cbError2);
                    }
                    res.status(200).json(results2);
                });
        } else {
            res.status(200).json(results);
        }

    });

}

//add a stakeholder subdocument to the project by id, but only if it is a unique stakeholder
const addStakeholder = (req, res) => {
    //find the project by id
    projects
        .findById(req.params.id)
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            //add the stakeholder to the project's stakeholders array if it is not duplicated, we only allow unique stakeholders
            if (!results.stakeholders.some(stakeholder => {
                return stakeholder.stakeHolder._id === req.body.stakeHolder._id;
            })){
               return res.status(500).json({'errMsg': 'Stakeholder with this id already exists, add the input/output proxy to the stakeholder instead of creating a new one'});
            }
            else{
                results.stakeholders.push(req.body);
                results.save((cbError2, results2) => {
                    if (!results2) {
                        return res.status(404).json({
                            "errMsg":
                                "The document could not be created in projects collection"
                        });
                    } else if (cbError2) {
                        return res.status(500).json(cbError2);
                    }
                    res.status(200).json(results2);
                });
            }

        });
}

const deleteStakeholder = (req, res) => {
    projects
        .findByIdAndUpdate(req.params.id, {
            $pull: {
                stakeholders: {
                    _id: req.params.stakeholderId
                }
            }
        }, {
            new: true
        }, (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
}

const editStakeholder = (req, res) => {
    projects
        .findById(req.params.id)
        .exec( (cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            //remove the stakeholder from results that matches stakeholder.stakeHolder._id === req.params.stakeholderId
            results.stakeholders = results.stakeholders.filter(stakeholder => {
                return stakeholder.stakeHolder._id !== req.params.stakeholderId;
            });
//add the stakeholder to the project's stakeholders array if it is not duplicated, we only allow unique stakeholders
            if (!results.stakeholders.some(stakeholder => {
                return stakeholder.stakeHolder._id === req.body.stakeHolder._id;
            })){
                return res.status(500).json({'errMsg': 'Stakeholder with this id already exists, add the input/output proxy to the stakeholder instead of creating a new one'});
            }
            else{
                results.stakeholders.push(req.body);
                results.save((cbError2, results2) => {
                    if (!results2) {
                        return res.status(404).json({
                            "errMsg":
                                "The document could not be created in projects collection"
                        });
                    } else if (cbError2) {
                        return res.status(500).json(cbError2);
                    }
                    res.status(200).json(results2);
                });
            }
        });
}

const getStakeholderById = (req, res) => {
    projects //fix this
        .findOne({"_id": req.params.projectid, "stakeholders.stakeHolder": req.params.id })
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "Current document could not be found in projects collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);

        });
}

module.exports = {
    allProjects,
    getProject,
    editProject,
    deleteProject,
    createProject,
    addStakeholder,
    deleteStakeholder,
    editStakeholder,
    getStakeholderById
}