const trainerController = require('../controllers/trainerController');
const express = require('express');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleWare');
const router = express.Router();

router.post("/trainer-login", trainerController.trainerLogin)
router.get("/get-trainer", verifyTokenMiddleware, trainerController.getTrainer)
router.get("/trainer-data", verifyTokenMiddleware, trainerController.getTrainerData)
router.post("/mark-task-completed", verifyTokenMiddleware, trainerController.markTaskCompleted)
router.post("/mark-attendance", verifyTokenMiddleware, trainerController.markAttendance)
router.post("/reset-password", verifyTokenMiddleware, trainerController.resetPassword)

module.exports = router