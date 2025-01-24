import { useState, useEffect } from 'react';
import './createprogram.css';
import { X } from 'lucide-react';

export default function CreateProgram({ onClose }) {
    const [programDetails, setProgramDetails] = useState({
        title: '',
        startDate: '',
        venue: '',
        endDate: '',
        status: '',
        location: '',
        trainers: '',
    });


    const [tasks, setTasks] = useState([{
        date: '12-05-2025',
        taskName: 'MERN',
        description: 'FullStack',

    }]);

    const [taskDetails, setTaskDetails] = useState({
        date: '',
        taskName: '',
        description: '',
    });

    const trainersList = [
        { id: 1, name: 'Trainer A', specialization: 'Web' },
        { id: 2, name: 'Trainer B', specialization: 'App' },
        { id: 3, name: 'Trainer C', specialization: 'BlockChain' },
        { id: 4, name: 'Trainer D', specialization: 'Python' },
    ];

    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramDetails({ ...programDetails, [name]: value });
    };

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleAddTask = () => {
        if (taskDetails.startDate && taskDetails.endDate && taskDetails.taskName && taskDetails.description) {
            const taskList = [];
            const start = new Date(taskDetails.startDate);
            const end = new Date(taskDetails.endDate);

            while (start <= end) {
                taskList.push({
                    date: start.toISOString().split('T')[0],
                    taskName: taskDetails.taskName,
                    description: taskDetails.description,
                });
                start.setDate(start.getDate() + 1);
            }

            setTasks([...tasks, ...taskList]);
            setTaskDetails({ startDate: '', endDate: '', taskName: '', description: '' });
        } else {
            alert('Please fill in all fields to add tasks.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Program Details Submitted:', programDetails);
        console.log('Tasks:', tasks);
    };

    return (
        <div className="create-program-container">
            <div className="create-program-header">
                Add Program Details
                <X onClick={handleClose} className="create-program-close-button" size="1.7rem" color="#333" />
            </div>

            <form className="create-program-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Program Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Program Title"
                        value={programDetails.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        placeholder="Start Date"
                        value={taskDetails.startDate}
                        onChange={(e) => setTaskDetails({ ...taskDetails, startDate: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        placeholder="End Date"
                        value={taskDetails.endDate}
                        onChange={(e) => setTaskDetails({ ...taskDetails, endDate: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Program Status</label>
                    <div className="status-radio-group">
                        <div className="status-option">
                            <input
                                type="radio"
                                id="status-ongoing"
                                name="status"
                                value="Ongoing"
                                checked={programDetails.status === 'Ongoing'}
                                onChange={handleChange}
                            />
                            <label htmlFor="status-ongoing">Ongoing</label>
                        </div>
                        <div className="status-option">
                            <input
                                type="radio"
                                id="status-completed"
                                name="status"
                                value="Completed"
                                checked={programDetails.status === 'Completed'}
                                onChange={handleChange}
                            />
                            <label htmlFor="status-completed">Completed</label>
                        </div>
                        <div className="status-option">
                            <input
                                type="radio"
                                id="status-upcoming"
                                name="status"
                                value="Upcoming"
                                checked={programDetails.status === 'Upcoming'}
                                onChange={handleChange}
                            />
                            <label htmlFor="status-upcoming">Upcoming</label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        value={programDetails.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        id="venue"
                        placeholder="Venue"
                        value={programDetails.venue}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group create-program-trainer-assignment">
                    <label htmlFor="trainers" className="create-program-trainer-label">Trainers Assigned</label>
                    <select
                        name="trainers"
                        id="trainers"
                        value={programDetails.trainers}
                        onChange={handleChange}
                        className="create-program-trainer-select"
                    >
                        <option value="">Select Trainer</option>
                        {trainersList.map((trainer) => (
                            <option key={trainer.id} value={trainer.id} className="create-program-trainer-option">
                                {trainer.id} - {trainer.name} ({trainer.specialization})
                            </option>
                        ))}
                    </select>
                </div>


                <div className="daily-task-section">
                    <h3>Schedule Daily Tasks</h3>
                    <div className="form-group">
                        <label htmlFor="taskDate">Task Date</label>
                        <input
                            type="date"
                            name="date"
                            id="taskDate"
                            value={taskDetails.startDate}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            type="text"
                            name="taskName"
                            id="taskName"
                            placeholder="Task Name"
                            value={taskDetails.taskName}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Task Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Task Description"
                            value={taskDetails.description}
                            onChange={handleTaskChange}
                        />
                    </div>
                    <button style={{
                        backgroundColor:"#6366F1",
                    }} type="button" onClick={handleAddTask}>
                        Add Task
                    </button>

                    <div className="task-list">
                        <h3 style={{
                            margin: "1em 0em",
                            color:"#333"
                        }}>Scheduled Tasks:</h3>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <div key={index} className="task-item">
                                    <p className='task-item-date'><strong>{task.date}</strong></p>
                                    <p className='task-item-task-name'>{task.taskName} - {task.description}</p>
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
