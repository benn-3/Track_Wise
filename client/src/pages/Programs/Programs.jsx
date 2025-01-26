import { Calendar, CheckCircle, MapPin, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import "./programs.css";
import CreateProgram from "../../components/CreateProgram/CreateProgram";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrograms } from "../../services/AdminOperations";
import ProgramCard from "../../components/ProgramCard/ProgramCard";

export default function Programs() {
    const [loading, setLoading] = useState(true);
    const [isCreateProgram, setIsCreateProgram] = useState(false);
    const [isOpenCard, setIsOpenCard] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [actionType, setActionType] = useState(""); // View or Manage

    const dispatch = useDispatch();
    const token = localStorage.getItem("Token");

    const programs = useSelector((state) => state.admin.programs) || [];

    useEffect(() => {
        async function fetchPrograms() {
            await getAllPrograms(token, dispatch);
        }
        fetchPrograms();
        setLoading(false);
    }, [token, dispatch]);

    const calculateProgress = (dailyTasks) => {
        if (!dailyTasks || !Array.isArray(dailyTasks) || dailyTasks.length === 0) {
            return { completed: 0, total: 0 };
        }

        let completedTasks = 0;
        let totalTasks = 0;

        dailyTasks.forEach((taskDay) => {
            if (taskDay.tasks && Array.isArray(taskDay.tasks)) {
                totalTasks += taskDay.tasks.length;
                completedTasks += taskDay.tasks.filter((task) => task.completed).length;
            }
        });

        return { completed: completedTasks, total: totalTasks };
    };

    const handleCreateProgramOpen = () => {
        setIsCreateProgram(true);
    };

    const handleCreateProgramClose = () => {
        setIsCreateProgram(false);
    };

    const handleCardOpen = (program, type) => {
        setSelectedProgram(program);
        setActionType(type);
        setIsOpenCard(true);
    };

    const handleCardClose = () => {
        setIsOpenCard(false);
        setSelectedProgram(null);
        setActionType("");
    };

    return (
        <div className="programs-container">
            <div className="programs-header">
                <div className="programs-header-text">
                    <div className="vertical-bar-title"></div>
                    <div className="programs-title">Training Programs</div>
                </div>
                <div className="programs-header-left">
                    <div className="programs-searchbar-container">
                        <Search size="1.7rem" color="#9CA3AF" />
                        <input
                            className="programs-search-bar"
                            type="text"
                            placeholder="Search programs..."
                        />
                    </div>
                    <div className="programs-add-button" onClick={handleCreateProgramOpen}>
                        Create Program
                    </div>
                </div>
            </div>

            {isCreateProgram && <div className="overlay" onClick={handleCreateProgramClose}></div>}

            <div className="programs-content">
                {programs && programs.length !== 0 ? (
                    programs.map((program, index) => {
                        const { completed, total } = calculateProgress(program.dailyTasks);

                        return (
                            <div className="program-card" key={index}>
                                <div className="program-card-header">
                                    <div className="program-title">{program.name}</div>
                                    <span className={`program-status ${program.programStatus.toLowerCase()}`}>
                                        {program.programStatus}
                                    </span>
                                </div>

                                <div className="program-details">
                                    <p>
                                        <MapPin size="1.2rem" color="#7A808D" style={{ marginRight: "0.5rem" }} />
                                        {program.location}
                                    </p>
                                    <p>
                                        <Calendar size="1.2rem" color="#7A808D" style={{ marginRight: "0.5rem" }} />
                                        {new Date(program.startDate).toLocaleDateString()} -{" "}
                                        {new Date(program.endDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <Users size="1.2rem" color="#7A808D" style={{ marginRight: "0.5rem" }} />
                                        Trainer Assigned
                                    </p>
                                </div>

                                <div className="program-progress">
                                    <div className="progress-text">
                                        <CheckCircle size="1.2rem" color="#6B7280" style={{ marginRight: "0.5rem" }} />
                                        Progress ({completed}/{total})
                                    </div>
                                    <div className="progress-container">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${total === 0 ? 0 : (completed / total) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="program-actions">
                                    <button
                                        className="view-schedule-btn"
                                        onClick={() => handleCardOpen(program, "View")}
                                    >
                                        View Schedule
                                    </button>
                                    <button
                                        className="manage-btn"
                                        onClick={() => handleCardOpen(program, "Manage")}
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-items-found-text">No programs available</div>
                )}
            </div>

            {isCreateProgram && <CreateProgram onClose={handleCreateProgramClose} />}
            {isOpenCard && (
                <ProgramCard
                    program={selectedProgram}
                    actionType={actionType}
                    onClose={handleCardClose}
                />
            )}
        </div>
    );
}
