const express = require('express');
const router = express.Router();



const ctrlOP = require('../controllers/outputProxy')   // for outputProxy
const ctrlPrograms = require('../controllers/programs') // for programs
const ctrlProjects = require('../controllers/projects') // for projects
const ctrlStakeholders = require('../controllers/stakeholders') // for stakeholders

router.get('/allOP', ctrlOP.allOP)

router.get('/allPrograms', ctrlPrograms.allPrograms)
router.get('/program/:id', ctrlPrograms.getProgram)
router.post('/createProgram', ctrlPrograms.createProgram)
router.put('/editProgram/:id', ctrlPrograms.editProgram)
router.delete('/deleteProgram/:id', ctrlPrograms.deleteProgram)

router.get('/allProjects', ctrlProjects.allProjects)
router.get('/project/:id', ctrlProjects.getProject)
router.post('/createProject', ctrlProjects.createProject)
router.put('/editProject/:id', ctrlProjects.editProject)
router.delete('/deleteProject/:id', ctrlProjects.deleteProject)
router.get('/getStakeholder/:projectid/:id', ctrlProjects.getStakeholderById)
router.post('/addStakeholder/:id', ctrlProjects.addStakeholder)
router.delete('/deleteStakeholder/:id/:stakeholderId', ctrlProjects.deleteStakeholder)
router.put('/editStakeholder/:id/:stakeholderId', ctrlProjects.editStakeholder)


router.get('/allStakeholders', ctrlStakeholders.getAllStakeholders)
router.get('/stakeholder/:id', ctrlStakeholders.getStakeholder)
router.post('/createStakeholder', ctrlStakeholders.createStakeholder)
router.put('/editStakeholder/:id', ctrlStakeholders.editStakeholder)
router.delete('/deleteStakeholder/:id', ctrlStakeholders.deleteStakeholder)


module.exports = router;