const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController");
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleWare");

router.get("/get-admin",verifyTokenMiddleware, adminController.getAdmin)
router.post("/admin-signup", adminController.adminSignup);
router.post("/admin-signin", adminController.adminSignin);
router.post("/add-trainer",verifyTokenMiddleware, adminController.addTrainer)
router.get("/get-all-trainers",verifyTokenMiddleware, adminController.getAllTrainers)
router.put("/edit-trainer",verifyTokenMiddleware, adminController.updateTrainer)
router.delete("/delete-trainer",verifyTokenMiddleware, adminController.deleteTrainer)

router.post("/add-program", verifyTokenMiddleware, adminController.addProgram)
router.get("/get-all-programs", verifyTokenMiddleware, adminController.getAllPrograms)
router.delete("/delete-task", verifyTokenMiddleware, adminController.deleteTask)
router.post("/add-task", verifyTokenMiddleware, adminController.addTask)
router.post("/edit-program", verifyTokenMiddleware, adminController.editProgram)
router.delete("/delete-program", verifyTokenMiddleware, adminController.deleteProgram)


module.exports = router