const Trainer = require("../models/trainerSchema");

const createTrainer = async (req, res) => {
  try {
    const { name, email, age, gender, phone, expertise, programsAssigned } =
      req.body;

    if (!name || !email || !age || !gender || !phone || !expertise) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const trainer = new Trainer({
      name,
      email,
      age,
      gender,
      phone,
      expertise,
      programsAssigned,
    });

    await trainer.save();

    res.status(201).json({
      success: true,
      message: "Trainer created successfully.",
      trainer,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        error: error.message,
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Trainer with this email already exists.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create trainer.",
      error: error.message,
    });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trainers.",
      error: error.message,
    });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }
    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid trainer ID format.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch trainer.",
      error: error.message,
    });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Trainer updated successfully.",
      trainer: updatedTrainer,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid trainer ID format.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update trainer.",
      error: error.message,
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid trainer ID format.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete trainer.",
      error: error.message,
    });
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
