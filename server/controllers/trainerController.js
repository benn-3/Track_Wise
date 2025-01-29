const Trainer = require("../models/trainerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Program = require("../models/programSchema");


const getTrainer = async (req, res) => {
  try {

    const trainer = await Trainer.findById(req.query.trainerId);

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


  try {

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }


    if (program.trainerAssigned.toString() !== trainerId) {
      return res.status(403).json({ success: false, message: "Trainer not assigned to this program" });
    }


    const taskIndex = program.dailyTasks.findIndex(task => task._id.toString() === taskId);


    if (taskIndex === -1) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }


    program.dailyTasks[taskIndex].completed = true;




    await program.save();


    return res.status(200).json({ success: true, message: "Task marked as completed", program });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const markAttendance = async (req, res) => {
  const { trainerId, attendanceData } = req.body;

  if (!trainerId || !attendanceData || !attendanceData.date || !attendanceData.status) {
    return res.status(400).json({ error: 'Trainer ID and complete attendance data (date, status) are required.' });
  }

  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ success: false, error: 'Trainer not found.' });
    }

    const existingAttendance = trainer.attendance.find(
      (entry) => new Date(entry.date).toDateString() === new Date(attendanceData.date).toDateString()
    );

    if (existingAttendance) {
      return res.status(400).json({ success: false, error: 'Attendance for this date is already marked.' });
    }

    const attendanceDate = new Date(attendanceData.date);


    const nineAM = new Date(attendanceDate);
    nineAM.setHours(9, 0, 0, 0);
    const tenAM = new Date(attendanceDate);
    tenAM.setHours(10, 0, 0, 0);


    if (attendanceDate < nineAM) {
      attendanceData.status = "Present";
    } else if (attendanceDate >= nineAM && attendanceDate < tenAM) {
      attendanceData.status = "Late";
    } else {
      attendanceData.status = "Absent";
    }


    trainer.attendance.push({
      date: attendanceDate,
      status: attendanceData.status,
    });

    await trainer.save();

    return res.status(200).json({ success: true, message: 'Attendance marked successfully.', trainer });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return res.status(500).json({ success: false, error: 'An error occurred while marking attendance.' });
  }
};




module.exports = { markAttendance, trainerLogin, getTrainer, getTrainerData, markTaskCompleted };
