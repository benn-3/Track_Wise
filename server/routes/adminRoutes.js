const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")


router.post("/admin-signup", adminController.adminSignup);
router.post("/admin-signin", adminController.adminSignin);
router.post("/add-trainer",adminController.addTrainer)

module.exports = router