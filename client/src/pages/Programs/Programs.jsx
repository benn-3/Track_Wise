import { Calendar, CheckCircle, MapPin, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import "./programs.css";
import CreateProgram from "../../components/CreateProgram/CreateProgram";

export default function Programs() {
    const [loading, setLoading] = useState(true);
    const [isCreateProgram, setIsCreateProgram] = useState(false);

    const programs = [
        {
            title: "Advanced Web Development",
            status: "Ongoing",
            location: "Tech Hub, Building A",
            dates: "Mar 15 - Apr 15, 2024",
            trainers: "2 Trainers Assigned",
            total: 30,
            completed: 5,
        },
        {
            title: "Data Science Bootcamp",
            status: "Upcoming",
            location: "Tech Hub, Building B",
            dates: "Apr 1 - May 1, 2024",
            trainers: "3 Trainers Assigned",
            total: 30,
            completed: 0,
        },
        {
            title: "Machine Learning Workshop",
            status: "Completed",
            location: "Tech Hub, Building C",
            dates: "Jan 1 - Jan 31, 2024",
            trainers: "1 Trainer Assigned",
            total: 30,
            completed: 30,
        },
        {
            title: "Cybersecurity Essentials",
            status: "Ongoing",
            location: "Tech Hub, Building D",
            dates: "Feb 1 - Feb 28, 2024",
            trainers: "4 Trainers Assigned",
            total: 28,
            completed: 10,
        },
        {
            title: "Cloud Computing Fundamentals",
            status: "Upcoming",
            location: "Tech Hub, Building E",
            dates: "May 1 - May 31, 2024",
            trainers: "2 Trainers Assigned",
            total: 30,
            completed: 0,
        },
        {
            title: "Full Stack Development",
            status: "Completed",
            location: "Tech Hub, Building F",
            dates: "Nov 1 - Nov 30, 2023",
            trainers: "3 Trainers Assigned",
            total: 30,
            completed: 30,
        },
        {
            title: "DevOps Basics",
            status: "Ongoing",
            location: "Tech Hub, Building G",
            dates: "Mar 1 - Mar 31, 2024",
            trainers: "2 Trainers Assigned",
            total: 31,
            completed: 15,
        },
    ];

    const calculateProgress = (total, completed) => {
        return (completed / total) * 100;
    };

    const handleCreateProgramOpen = () => {
        setIsCreateProgram(true);
    };

    const handleCreateProgramClose = () => {
        setIsCreateProgram(false);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="programs-container">
            <div className="programs-header">
                <div className="programs-header-text">
                    <div className="programs-title">Training Programs</div>
                </div>
                <div className="programs-header-left">
                    <div className="programs-searchbar-container">
                        <Search size="1.7rem" color="#9CA3AF" />
                        <input
                            className="programs-search-bar"
                            type="text"
                            placeholder="Search programs, programs..."
                        />
                    </div>
                    <div className="programs-add-button" onClick={handleCreateProgramOpen}>
                        Create Program
                    </div>
                </div>
            </div>

            {/* Overlay when CreateProgram modal is open */}
            {isCreateProgram && <div className="overlay" onClick={handleCreateProgramClose}></div>}

            <div className="programs-content">
                {programs.map((program, index) => (
                    <div className="program-card" key={index}>
                        <div className="program-card-header">
                            <div className="program-title">{program.title}</div>
                            <span className={`program-status ${program.status.toLowerCase()}`}>
                                {program.status}
                            </span>
                        </div>

                        <div className="program-details">
                            <p>
                                <MapPin size="1.2rem" color="#7A808D" style={{ marginRight: '0.5rem' }} />
                                {program.location}
                            </p>
                            <p>
                                <Calendar size="1.2rem" color="#7A808D" style={{ marginRight: '0.5rem' }} />
                                {program.dates}
                            </p>
                            <p>
                                <Users size="1.2rem" color="#7A808D" style={{ marginRight: '0.5rem' }} />
                                {program.trainers}
                            </p>
                        </div>

                        <div className="program-progress">
                            <div className="progress-text">
                                <CheckCircle size="1.2rem" color="#6B7280" style={{ marginRight: '0.5rem' }} />
                                Progress (Day {program.completed}/{program.total})
                            </div>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${loading ? 0 : calculateProgress(program.total, program.completed)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="program-actions">
                            <button className="view-schedule-btn">View Schedule</button>
                            <button className="manage-btn">Manage</button>
                        </div>
                    </div>
                ))}
            </div>


            {isCreateProgram && <CreateProgram onClose={handleCreateProgramClose} />}
        </div>
    );
}
