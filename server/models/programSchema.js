const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    programId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
        trim: true,
    },
    trainerAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true,
    },
    programStatus: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled',
    },
    dailyTasks: [
        {
            date: {
                type: Date,
                required: true,
            },
            tasks: [
                {
                    taskName: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    completed: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

programSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

programSchema.index({
    programId: 1,
    startDate: 1,
    programStatus: 1,
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
