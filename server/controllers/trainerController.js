const Trainer = require("../models/trainerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Program = require("../models/programSchema");


const getTrainer = async (req, res) => {
  try {
    console.log(req)
    const trainer = await Trainer.findById(req.query.trainerId);
    console.log(trainer)
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json({
      trainer: trainer,
      success: true
    });
  }
  catch (err) {
    res.status(500).json({ message: "Error fetching trainer" });
  }
}

const trainerLogin = async (req, res) => {
  try {
    const { email, password } = req.body.formData;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }


    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, trainer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { trainerId: trainer._id, email: trainer.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );


    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      trainer: {
        email: trainer.email,
        name: trainer.name,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getTrainerData = async (req, res) => {
  try {
    const trainerId = req.query.trainerId;
    const trainer = await Trainer.findById(trainerId).select('-password').populate("programsAssigned");
    if (!trainer) {
      return res.status(404).json({ success: false, message: "Trainer not found" });
    }
    return res.status(200).json({
      message: "Trainer data retrieved successfully",
      success: true,
      trainer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const markTaskCompleted = async (req, res) => {
  const { programId, trainerId, taskId } = req.body;

  console.log( programId, trainerId, taskId)

  try {
    
    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    
    if (program.trainerAssigned.toString() !== trainerId) {
      return res.status(403).json({ success: false, message: "Trainer not assigned to this program" });
    }

    
    const taskIndex = program.dailyTasks.findIndex(task => task._id.toString() === taskId);

    
    console.log("Program:", program);
    console.log("Task Index:", taskIndex);

    if (taskIndex === -1) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    
    program.dailyTasks[taskIndex].completed = true;

    
    console.log("Updated Task:", program.dailyTasks[taskIndex]);

    
    await program.save();

    
    return res.status(200).json({ success: true, message: "Task marked as completed", program });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = { trainerLogin, getTrainer, getTrainerData, markTaskCompleted };
