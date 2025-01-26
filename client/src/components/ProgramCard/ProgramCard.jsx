/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { X } from "lucide-react";
import "./programCard.css";

export default function ProgramCard({ program, actionType, onClose }) {
    if (!program) return null;

    const programProgress = program.progress || 0;
    const schedule = program.dailyTasks || [];

    const startDate = new Date(program.startDate);
    const endDate = new Date(program.endDate);

    if (isNaN(startDate) || isNaN(endDate)) {
        return <div>Invalid date format</div>;
    }

    let dayOfProgram = 0;
    let totalDays = 0;

    // If the program is ongoing, calculate the day and total days
    if (program.programStatus === "Ongoing") {
        const today = new Date();
        const timeDifference = today - startDate;
        dayOfProgram = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1; // Day of the program from the startDate
    }

    // Calculate total duration days between startDate and endDate
    totalDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

    return (
        <>
            <div className="overlay-2"></div>
            <div className="program-modal">
                <div className="program-modal-content">
                    <div className="program-modal-content-top">
                        <div className="program-modal-header">
                            <div className="program-name">{program.name}</div>
                            <X size={"2rem"} onClick={onClose} />
                        </div>
                        <div className="program-description">{program.description}</div>
                        {
                            program.programStatus === "Ongoing" ? (
                                <div>
                                    <div>Day {dayOfProgram} of {totalDays}</div>
                                </div>
                            ) : (
                                <div>Program duration: {totalDays}</div>
                            )
                        }

                        <div className="program-progress-container">
                            <div>Program Progress</div>
                            <div className="progress-modal-bar">
                                <div
                                    className="progress"
                                    style={{
                                        width: `${programProgress}%`,
                                    }}
                                ></div>
                            </div>
                            <div>{programProgress}%</div>
                        </div>
                    </div>
                    <div className="program-modal-content-bottom">
                        <div className="schedule-list">
                            {schedule.length > 0 ? (
                                schedule.map((session, index) => (
                                    <div key={index} className="schedule-item">
                                        <div>Date: {session.date}</div>
                                        <div>Task Name: {session.taskName}</div>
                                        <div>Description: {session.description}</div>
                                    </div>
                                ))
                            ) : (
                                <div>No schedule available for this program.</div>
                            )}
                        </div>
                        <div className="program-modal-trainer-details">
                            <div>Trainer Details</div>
                            <div>{program.trainerAssigned?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
