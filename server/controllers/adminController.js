const Trainer = require("../models/trainerSchema");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminSchema");
const Counter = require("../models/counterSchema");
const { createToken } = require("../utils/jwt");
const { Op } = require('sequelize');
const Program = require("../models/programSchema");
const cron = require('node-cron');
const moment = require('moment');


const getAdmin = async (req, res) => {
    try {
        const { adminId } = req.query;

        if (!adminId) {
            return res.status(400).json({ message: 'Admin ID is required' });
        }

        const adminIdNumber = Number(adminId);
        if (isNaN(adminIdNumber)) {
            return res.status(400).json({ message: 'Invalid Admin ID' });
        }

        const admin = await Admin.findOne({ adminId: adminIdNumber }).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        return res.status(200).json({ admin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const adminSignup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;


        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }


        const counter = await Counter.findOneAndUpdate(
            { _id: 'adminId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const adminId = counter.sequence_value;


        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new Admin({
            adminId,
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({
            message: "Admin created successfully!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;


        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = createToken({ adminId: admin.adminId, email: admin.email });

        res.status(200).json({
            message: "Admin signed in successfully!",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


const addTrainer = async (req, res) => {
    try {
        const { name, email, phone, age, gender, specialization, skills, address } = req.body;

        if (!name || !email || !phone || !age || !gender || !specialization || !address || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format."
            });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be 10 digits."
            });
        }


        const existingTrainer = await Trainer.findOne({
            where: { [Op.or]: [{ email }, { phone }] },
        });

        if (existingTrainer) {
            return res.status(400).json({
                success: false,
                message: "A trainer with the provided email or phone number already exists.",
            });
        }


        const counter = await Counter.findByIdAndUpdate(
            { _id: 'trainerId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const trainerId = counter.sequence_value;


        const trainer = await Trainer.create({
            trainerId,
            name,
            email,
            phone,
            age,
            gender,
            specialization,
            skills,
            address,
        });

        return res.status(201).json({
            success: true,
            message: "Trainer added successfully.",
            trainer,
        });
    } catch (error) {
        console.error("Error adding trainer:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the trainer. Please try again.",
        });
    }
};

const getAllTrainers = async (req, res) => {
    try {

        const trainers = await Trainer.find()
            .populate('programsAssigned');

        res.status(200).json({
            success: true,
            message: "Trainers retrieved successfully.",
            trainers,
        });
    } catch (error) {

        console.error("Error fetching trainers:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching trainers.",
        });
    }
};


const getTrainerById = async (req, res) => {
    try {
        const { trainerId } = req.params;
        const trainer = await Trainer.findOne({ trainerId });
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Trainer retrieved successfully.",
            trainer,
        });
    } catch (error) {
        console.error("Error fetching trainer:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the trainer.",
        });
    }
};


const updateTrainer = async (req, res) => {
    try {

        const {
            trainerId,
            formData

        } = req.body;


        formData.updatedAt = Date.now();

        const trainer = await Trainer.findOneAndUpdate({ trainerId }, formData, {
            new: true,
            runValidators: true,
        });

        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Trainer updated successfully.",
            trainer,
        });
    } catch (error) {
        console.error("Error updating trainer:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the trainer.",
        });
    }
};


const deleteTrainer = async (req, res) => {
    try {

        const { trainerId } = req.query;

        const trainer = await Trainer.findOneAndDelete({ trainerId });
        if (!trainer) {
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
        console.error("Error deleting trainer:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the trainer.",
        });
    }
};




const addProgram = async (req, res) => {
    try {

        console.log('Incoming request body:', req.body);

        const {
            name,
            description,
            startDate,
            endDate,
            venue,
            location,
            trainerAssigned,
            programStatus,
            dailyTasks,
        } = req.body.formData;


        console.log('Received dailyTasks:', dailyTasks);



        const trainer = await Trainer.findOne({ trainerId: trainerAssigned });

        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: 'Trainer not found.',
            });
        }

        const counter = await Counter.findByIdAndUpdate(
            { _id: 'programId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const programId = counter.sequence_value;


        const program = new Program({
            programId,
            name,
            description,
            startDate,
            endDate,
            venue,
            location,
            trainerAssigned: trainer._id,
            programStatus,
            dailyTasks: dailyTasks,
        });

        await program.save();

        trainer.availability = 'Assigned';
        trainer.programsAssigned = trainer.programsAssigned || [];
        trainer.programsAssigned.push(program._id);

        await trainer.save();

        res.status(201).json({
            success: true,
            message: 'Program added successfully',
            program,
        });

    } catch (error) {
        console.error('Error adding program:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding program',
            error: error.message,
        });
    }
};



const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().populate("trainerAssigned").exec();

        res.status(200).json({
            success: true,
            message: 'Programs fetched successfully',
            programs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching programs',
            error: error.message,
        });
    }
};


console.log('Cron job started. Updating program statuses every second.');

cron.schedule('* * * * * *', async () => {
    const today = moment().startOf('day');

    try {

        const programs = await Program.find({ programStatus: { $ne: 'Cancelled' } });

        programs.forEach(async (program) => {
            const startDate = moment(program.startDate);
            const endDate = moment(program.endDate);


            if (startDate.isSame(today, 'day') && program.programStatus !== 'Ongoing') {
                program.programStatus = 'Ongoing';
                await program.save();
            }

            else if (endDate.isBefore(today, 'day') && program.programStatus !== 'Completed') {
                program.programStatus = 'Completed';
                await program.save();
            }
        });
    } catch (err) {
        console.error('Error updating program statuses:', err);
    }
});

const deleteTask = async (req, res) => {
    const { programId, taskId } = req.query;

    const program = await Program.findById(programId);

    if (!program) {
        return res.status(404).json({
            success: false, message: 'Program not found'
        });
    }

    if (Array.isArray(taskId)) {

        taskId.forEach((id) => {
            const taskIndex = program.dailyTasks.findIndex(task => task._id.toString() === id);

            if (taskIndex !== -1) {
                program.dailyTasks.splice(taskIndex, 1);
            }
        });
    } else {

        const taskIndex = program.dailyTasks.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({
                success: false, message: 'Task not found'
            });
        }

        program.dailyTasks.splice(taskIndex, 1);
    }

    await program.save();

    return res.json({
        success: true, message: 'Task(s) deleted successfully'
    });
}

const addTask = async (req, res) => {
    const { programId, newTaskList } = req.body;

    if (!programId || !newTaskList) {
        return res.status(400).json({
            success: false,
            message: 'Program ID and task data are required',
        });
    }

    const program = await Program.findById(programId);

    if (!program) {
        return res.status(404).json({
            success: false,
            message: 'Program not found',
        });
    }

    
    const tasksWithRequiredFields = newTaskList.map(task => ({
        date: task.date,
        taskName: task.taskName,
        description: task.taskDescription,  
        completed: task.completed || false,
    }));

    program.dailyTasks.push(...tasksWithRequiredFields);

    await program.save();

    return res.json({
        success: true,
        message: 'Task added successfully',
    }); 
};



module.exports = {
    adminSignin,
    adminSignup,
    addTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    getAdmin,
    addProgram,
    getAllPrograms,
    deleteTask,
    addTask
}