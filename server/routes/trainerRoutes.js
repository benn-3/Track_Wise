const trainerController = require('../controllers/trainerController');
const express = require('express');
const router = express.Router();

router.post("/trainer-login",trainerController.trainerLogin)
router.get("/get-trainer",trainerController.getTrainer)
router.get("/trainer-data",trainerController.getTrainerData)
router.post("/mark-task-completed",trainerController.markTaskCompleted)

module.exports = router