const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.get("/get-admin", adminController.getAdmin)
router.post("/admin-signup", adminController.adminSignup);
router.post("/admin-signin", adminController.adminSignin);
router.post("/add-trainer", adminController.addTrainer)
router.get("/get-all-trainers", adminController.getAllTrainers)
router.put("/edit-trainer", adminController.updateTrainer)
router.delete("/delete-trainer", adminController.deleteTrainer)

router.post("/add-program",adminController.addProgram)
router.get("/get-all-programs",adminController.getAllPrograms)

module.exports = router