import { useState, useEffect } from "react";
import "./createprogram.css";
import { X } from "lucide-react";
import { addProgram, getAllPrograms, getAllTrainers } from "../../services/AdminOperations";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../hooks/useToast";
import { setTrainers } from "../../redux/actions/adminActions";

export default function CreateProgram({ onClose }) {
    const token = localStorage.getItem("Token");
    const trainers = useSelector((state) => state.admin.trainers);
    const dispatch = useDispatch();

    const [programDetails, setProgramDetails] = useState({
        name: "",
        startDate: "",
        endDate: "",
        venue: "",
        programStatus: "Scheduled",
        location: "",
        trainerAssigned: "",
        description: "",
    });

    const [tasks, setTasks] = useState([]);
    const [taskDetails, setTaskDetails] = useState({
        date: "",
        taskName: "",
        description: "",
    });

    const [trainersList, setTrainersList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (trainers) {
            const filteredTrainers = trainers.filter((trainer) => trainer.availability === "Not Assigned");
            setTrainersList(filteredTrainers);
        }
    }, [trainers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramDetails({ ...programDetails, [name]: value });
    };

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleAddTask = () => {
        const { taskName, description } = taskDetails;
        const date = taskDetails.date || programDetails.startDate;
        let endDate = taskDetails.endDate || programDetails.endDate;

        if (!taskName || !description || !date) {
            alert("Please fill in all task details.");
            return;
        }

        const taskStartDate = new Date(date);
        const taskEndDate = new Date(endDate);

        if (taskEndDate < taskStartDate) {
            alert("End date cannot be before start date.");
            return;
        }

        const newTasks = [];
        while (taskStartDate <= taskEndDate) {
            newTasks.push({
                date: taskStartDate.toISOString().split('T')[0],
                tasks: [
                    {
                        taskName,
                        description,
                        completed: false,
                    }
                ],
            });

            taskStartDate.setDate(taskStartDate.getDate() + 1);
        }

        setTasks([...tasks, ...newTasks]);
        setTaskDetails({ date: "", taskName: "", description: "", endDate: "" });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, startDate, endDate, venue, trainerAssigned, location, description } = programDetails;

        if (!name || !startDate || !endDate || !venue || !trainerAssigned || !location || !description) {
            setError("Please fill in all required fields.");
            return;
        }

        const payload = {
            ...programDetails,
            dailyTasks: tasks,
        };

        console.log(payload)

        try {
            const response = await addProgram(token, payload);
            if (response.success) {
                showToast("Program added successfully", "success");
                await getAllPrograms(token, dispatch);
                await getAllTrainers(token, dispatch);
                console.log("Program added successfully:", response);
            } else {
                showToast("Error adding program", "error");
            }
            onClose();
        } catch (error) {
            console.error("Error adding program:", error.message);
            alert("Failed to add program. Please try again.");
        }
    };

    return (
        <div className="create-program-container">
            <div className="create-program-header">
                Add Program Details
                <X onClick={onClose} className="create-program-close-button" size="1.7rem" color="#333" />
            </div>

            <form className="create-program-form" onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && <p className="error-text">{error}</p>}

                {/* Program Title */}
                <div className="form-group">
                    <label htmlFor="name">Program Name *</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Program Name"
                        value={programDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Program Description */}
                <div className="form-group">
                    <label htmlFor="description">Program Description *</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Program Description"
                        value={programDetails.description}
                        onChange={handleChange}
                        required
                        style={{
                            fontFamily: "Montserrat"
                        }}
                    />
                </div>

                {/* Start Date */}
                <div className="form-group">
                    <label htmlFor="startDate">Start Date *</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={programDetails.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* End Date */}
                <div className="form-group">
                    <label htmlFor="endDate">End Date *</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={programDetails.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Venue */}
                <div className="form-group">
                    <label htmlFor="venue">Venue *</label>
                    <input
                        type="text"
                        name="venue"
                        id="venue"
                        placeholder="Venue"
                        value={programDetails.venue}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Trainer Assignment */}
                <div className="form-group">
                    <label htmlFor="trainerAssigned">Trainer Assigned *</label>
                    <select
                        name="trainerAssigned"
                        id="trainerAssigned"
                        value={programDetails.trainerAssigned}
                        onChange={(e) =>
                            setProgramDetails({ ...programDetails, trainerAssigned: e.target.value })
                        }
                        required
                    >
                        <option value="">Select Trainer</option>
                        {trainersList.map((trainer) => (
                            <option key={trainer.trainerId} value={trainer.trainerId}>
                                {trainer.name} ({trainer.specialization})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location */}
                <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        value={programDetails.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Daily Tasks */}
                <div className="daily-task-section">
                    <h3>Schedule Daily Tasks</h3>
                    <h5 style={{ color: 'red', fontWeight: "600" }}>
                        You can add tasks later if needed.
                    </h5>
                    <div className="form-group">
                        <label htmlFor="date">Task Date</label>
                        <input
                            type="date"
                            name="date"
                            value={taskDetails.date}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            type="text"
                            name="taskName"
                            value={taskDetails.taskName}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Task Description</label>
                        <input
                            type="text"
                            name="description"
                            value={taskDetails.description}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <div className="task-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" onClick={handleAddTask}>
                            Add Task
                        </button>
                        <button type="button" onClick={() => setTasks([])}>
                            Reset Tasks
                        </button>
                    </div>

                    <div className="task-list">
                        <h3>Scheduled Tasks:</h3>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <div key={index} className="task-item">
                                    <p>
                                        <strong>{task.date}</strong>
                                    </p>
                                    <p>
                                        {task.taskName} - {task.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No tasks added yet.</p>
                        )}
                    </div>
                </div>

                <button type="submit">Add Program</button>
            </form>
        </div>
    );
}
