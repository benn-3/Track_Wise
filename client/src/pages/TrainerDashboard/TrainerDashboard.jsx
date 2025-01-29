import { useEffect, useState, useRef } from "react";
import "./trainerdashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTrainerData, handleMarkAsComplete, markAttendance } from "../../services/TrainerOperations";
import { Calendar, Clock, Save, AlertCircle, CheckCheck, Check, X, User, LogOut, BookOpenCheck } from "lucide-react";
import { showToast } from "../../hooks/useToast";
import CustomCalendar from "../../components/Calendar/CustomCalendar";

export default function TrainerDashboard() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("Token");
    const trainerId = useSelector((state) => state.auth.id);
    const { assignedPrograms } = useSelector((state) => state.trainer);
    const [currentProgram, setCurrentProgram] = useState(null);
    const currentTrainer = useSelector((state) => state.auth.user);
    const [taskFilter, setTaskFilter] = useState("all");
    const lastTaskRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTrainerProfile, setIsTrainerProfile] = useState(false);
    const [attendanceMarkedToday, setAttendanceMarkedToday] = useState(false);
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => {
        const getTrainerData = async () => {
            if (token && trainerId) {
                await handleGetTrainerData(token, trainerId, dispatch);
            }
        };
        getTrainerData();
    }, [token, trainerId, dispatch]);

    useEffect(() => {
        if (assignedPrograms?.programsAssigned?.length > 0) {
            setCurrentProgram(assignedPrograms.programsAssigned[0]);
        }
    }, [assignedPrograms]);

    useEffect(() => {
        if (lastTaskRef.current) {
            lastTaskRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [assignedPrograms, taskFilter]);

    useEffect(() => {
        if (currentTrainer && currentTrainer.attendance) {
            const today = new Date().setHours(0, 0, 0, 0);
            const lastAttendance = currentTrainer.attendance.slice(-1)[0];

            if (lastAttendance && new Date(lastAttendance.date).setHours(0, 0, 0, 0) === today) {
                setAttendanceMarkedToday(true);
            } else {
                setAttendanceMarkedToday(false);
            }
        }
    }, [currentTrainer]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const tasks = currentProgram?.dailyTasks || [];
    const completedTasks = tasks.filter((task) => task.completed).length;
    const progressPercentage = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    const getTaskIcon = (task) => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);

        if (task.completed) {
            return <Save size="1.5rem" color="green" />;
        } else if (taskDate === today) {
            return <Clock size="1.5rem" color="blue" />;
        } else if (taskDate > today) {
            return <Calendar size="1.5rem" color="orange" />;
        } else {
            return <AlertCircle size="1.5rem" color="red" />;
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();


        if (newPassword !== confirmPassword) {
            showToast("Passwords do not match!", "error");
        } else {
            const response = await resetPassword(token, email, password, dispatch)
            showToast("Password reset successfully!", "succes");
            setIsResetPassword(false);
        }
    };

    const isTaskTodayAndNotCompleted = (task) => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        return taskDate === today && !task.completed;
    };

    const getTaskBgClass = (task) => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);

        if (task.completed) {
            return "bg-completed";
        } else if (taskDate === today) {
            return "bg-ongoing";
        } else if (taskDate > today) {
            return "bg-scheduled";
        } else {
            return "bg-missed";
        }
    };

    const handleTaskCompletion = async (task) => {

        const response = await handleMarkAsComplete(token, currentProgram._id, currentTrainer._id, task._id, dispatch);
        if (response.success) {
            setAttendanceMarkedToday(true)
            showToast("Marked task completed", "success");
        } else {
            showToast("Failed to mark task completed", "error");
        }
    };

    const filterProgramsSearch = () => {
        const trainersAssignedPrograms = assignedPrograms?.programsAssigned;
        if (!searchQuery) {
            return trainersAssignedPrograms;
        }
        return trainersAssignedPrograms.filter((program) =>
            program.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleProgramItemClick = (program) => {
        setCurrentProgram(program);
    };

    useEffect(() => {
        console.log("Trainer", currentTrainer)
    }, [currentTrainer])

    const filterTasks = () => {
        let filteredTasks = [];

        if (taskFilter === "completed") {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (taskFilter === "missed") {
            filteredTasks = tasks.filter(task =>
                !task.completed && new Date(task.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
            );
        } else {
            filteredTasks = tasks;
        }


        const sortedTasks = [...filteredTasks].sort((a, b) => new Date(a.date) - new Date(b.date));

        return sortedTasks;
    };


    const handleAttendance = async (status) => {
        const confirmation = await confirm("Are you sure you want to mark attendance?", "Confirm Attendance");

        if (confirmation) {
            const attendanceData = {
                status: status,
                date: new Date()
            };

            try {
                const response = await markAttendance(token, currentTrainer._id, attendanceData, dispatch);

                if (response.success) {
                    showToast("Attendance updated", "success");
                } else {
                    showToast("Failed to update attendance", "error");
                }
            } catch (error) {
                showToast("An error occurred while updating attendance", "error");
                console.error(error);
            }
        }
    };



    return (
        <div className="trainer-dashboard-container">
            {
                isTrainerProfile && <div className="overlay"></div>
            }
            <div className="trainer-dashboard-container-left">
                <div className="trainer-dashboard-left-top">
                    <div className="top-header">
                        <div className="top-left-title">
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {currentProgram?.name || "No Program Assigned"} -&nbsp;{" "}
                                <span
                                    style={{
                                        color: "#6b7280",
                                        fontSize: "1.2rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    {currentProgram
                                        ? `${new Date(
                                            currentProgram.startDate
                                        ).toLocaleDateString()} to ${new Date(
                                            currentProgram.endDate
                                        ).toLocaleDateString()}`
                                        : ""}
                                </span>
                            </span>
                            <span className="trainer-dashboard-day">
                                Day {completedTasks ? completedTasks + 1 : 0} of {tasks.length}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0.5rem",
                                borderRadius: "20000px",
                                width: "3rem",
                                height: "3rem",


                            }}
                        >
                            {/* <Calendar onClick={() => {
                                setIsShowCalendar(true)
                            }} size={"1.5rem"} color="green" /> */}
                            <BookOpenCheck style={{
                                marginBottom: "1.5rem"
                            }} />
                        </div>
                    </div>
                    <div className="top-bottom">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "500",
                                    color: "#333",
                                }}
                            >
                                Program Progress
                            </div>
                            <div
                                style={{
                                    color: "#655DE8",
                                    fontWeight: "500",
                                    fontStyle: "italic",
                                }}
                            >
                                {progressPercentage}%
                            </div>
                        </div>
                        <div className="trainer-dashboard-progress-container">
                            <div
                                className="trainer-dashboard-progress"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="trainer-dashboard-left-bottom">
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "#333" }}>
                            Program&apos;s Schedule - {tasks.length} Tasks
                        </span>
                        <div className="trainer-dashboard-schedule-filter">
                            <select onChange={(e) => setTaskFilter(e.target.value)} value={taskFilter}>
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="missed">Missed</option>
                            </select>
                        </div>

                    </div>
                    <div className="trainer-dashboard-schedule-container">
                        {filterTasks().length > 0 ? (
                            filterTasks().map((task, index) => (
                                <div key={task._id} className="trainer-task-item" ref={index === filterTasks().length - 1 ? lastTaskRef : null}>
                                    <div style={{ display: "flex" }}>
                                        <div className={`trainer-dashboard-task-icon ${getTaskBgClass(task)}`}>
                                            {getTaskIcon(task)}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "1.1rem", fontWeight: "550", color: "#333" }}>
                                                {task.taskName} - {task.description}
                                            </span>
                                            <span style={{ color: "#888e99", fontWeight: "500", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                                                {new Date(task.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    {isTaskTodayAndNotCompleted(task) && (
                                        <div className="trainer-dashboard-task-action" onClick={() => handleTaskCompletion(task)}>
                                            Mark as Completed
                                            <CheckCheck style={{ marginLeft: "1rem" }} size={"1.45rem"} color="#7A76DD" />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>No tasks available</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="trainer-dashboard-container-right">


                <div className="trainer-dashboard-right-bottom">
                    <div style={{
                        display: 'flex',
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "#333"
                        }}>Hello , {currentTrainer?.name}</div>
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",

                        }}>
                            <LogOut style={{
                                cursor: "pointer"
                            }} onClick={() => {
                                localStorage.removeItem("Token")
                                window.location.href = "/login"
                            }} />
                            |
                            <User onClick={() => setIsTrainerProfile(true)} style={{
                                cursor: "pointer",
                            }} />
                        </span>

                    </div>

                    {attendanceMarkedToday ? (
                        <>
                            <span style={{
                                fontSize: "1rem",
                                fontWeight: "500"
                            }}>Attendance Actions :</span>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem"
                            }}>
                                <div className="trainer-present-button disabled" onClick={() => handleAttendance("Present")}> <Check /> Mark Present</div>
                                <div className="trainer-absent-button disabled" onClick={() => handleAttendance("Absent")}> <X /> Mark Absent</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <span style={{
                                fontSize: "1rem",
                                fontWeight: "500"
                            }}>Attendance Actions :</span>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem"
                            }}>
                                <div className="trainer-present-button marked" onClick={() => handleAttendance("Present")}> <Check /> Mark Present</div>
                                <div className="trainer-absent-button marked" onClick={() => handleAttendance("Absent")}> <X /> Mark Absent</div>
                            </div>
                        </>
                    )}
                </div>
                <div className="trainer-dashboard-right-top">
                    <input
                        placeholder="Search assigned programs..."
                        type="text"
                        className="trainer-dashboard-search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="trainer-dashboard-program-list">
                        {filterProgramsSearch()?.length > 0 ? (
                            filterProgramsSearch().map((program, index) => (
                                <div
                                    className="trainer-dashboard-search-list"
                                    key={program._id}
                                    onClick={() => handleProgramItemClick(program)}
                                >
                                    <div>
                                        {index + 1}.{program.name}
                                    </div>
                                    <div>
                                        - {program.programStatus}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No programs match your search</div>
                        )}

                    </div>
                </div>
            </div>

            {/* {
                isShowCalendar && <CustomCalendar program={currentProgram} onClose={() => {
                    setIsShowCalendar(false)
                }} />
            } */}


            {
                isTrainerProfile && (
                    isResetPassword ? (
                        <div className="reset-password-container">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h2 style={{ margin: "0" }}>Reset Password</h2>
                                <X style={{ cursor: "pointer" }} onClick={() => setIsResetPassword(false)} />
                            </div>
                            <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", flex: "1", justifyContent: "space-evenly" }}>
                                <div className="reset-password-input">
                                    <label htmlFor="email">Email Address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={currentTrainer?.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="reset-password-input">
                                    <label htmlFor="new-password">New Password:</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        name="new-password"
                                        placeholder="Enter new password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="reset-password-input">
                                    <label htmlFor="confirm-password">Confirm New Password:</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        name="confirm-password"
                                        placeholder="Confirm new password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button style={{
                                        backgroundColor: "#0FA87A",
                                        border: "none",
                                        outline: 'none',
                                        padding: "0.5rem 0.7rem",
                                        color: "white",
                                        borderRadius: "8px",
                                        fontWeight: "500"
                                    }} type="submit">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    ) : <div className="trainer-profile">
                        <h2 className="trainer-profile-top">
                            Trainer&apos;s Details
                            <X style={{
                                cursor: "pointer"
                            }} size={"1.7rem"} onClick={() => setIsTrainerProfile((prev) => !prev)} />
                        </h2>
                        <div className="trainer-profile-bottom">
                            <div className="trainer-detail">
                                <strong>Name:</strong> {currentTrainer?.name || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Email:</strong> {currentTrainer?.email || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Age:</strong> {currentTrainer?.age || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Gender:</strong> {currentTrainer?.gender || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Address:</strong> {currentTrainer?.address || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Phone:</strong> {currentTrainer?.phone || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Specialization:</strong> {currentTrainer?.specialization?.join(", ") || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Skills:</strong> {currentTrainer?.skills?.join(", ") || "N/A"}
                            </div>
                            <div className="trainer-detail">
                                <strong>Programs Assigned:</strong> {currentTrainer?.programsAssigned?.length || 0}
                            </div>
                        </div>
                        <div style={{
                            alignSelf: "flex-end",
                            backgroundColor: "#8B5DFF",
                            color: "#fff",
                            padding: "0.5rem 0.7rem",
                            borderRadius: "10px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }} onClick={() => [
                            setIsResetPassword(true)
                        ]}>
                            Reset Password
                        </div>
                    </div>
                )

            }
        </div>


    );
}
