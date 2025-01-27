import { useEffect, useState } from 'react';
import { X, Check, Trash, Edit, User, Mail, Award, Clipboard, Activity, Plus, Phone, BookOpen } from 'lucide-react';
import { editTrainer, deleteTrainer } from '../../services/AdminOperations';
import { showToast } from '../../hooks/useToast';

export default function TrainerPreviewPanel({ isOpen, onRequestClose, trainer, onEditTrainerSuccess, onTrainerDeleted }) {
    const [formData, setFormData] = useState(trainer);
    const [isClosing, setIsClosing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('token');
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        setFormData(trainer);
    }, [trainer, isOpen]);

    const hasChanges = () => {
        return JSON.stringify(formData) !== JSON.stringify(trainer);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const response = await editTrainer(token, formData.trainerId, formData);
        if (response?.success) {
            showToast("Trainer updated successfully", "success");
            onEditTrainerSuccess();
        } else {
            showToast("Error updating trainer", "error");
        }
        setIsEditing(false);
        onRequestClose();
    };

    const handleDelete = async () => {
        const sure = confirm("Are you sure you want to delete this trainer?");
        if (sure) {
            const response = await deleteTrainer(token, formData.trainerId);
            if (response?.success) {
                showToast("Trainer deleted successfully", "success");
                onTrainerDeleted();
            } else {
                showToast("Error deleting trainer", "error");
            }
        }
        onRequestClose();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsClosing(true);
        onRequestClose();
    };


    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill]
            });
            setNewSkill(""); // clear input after adding skill
        }
    };

    const handleRemoveSkill = (skill) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skill)
        });
    };


    const calculateAttendance = (attendance) => {
        const counts = { present: 0, absent: 0, late: 0 };

        attendance.forEach((entry) => {
            if (entry.status === 'Present') counts.present++;
            if (entry.status === 'Absent') counts.absent++;
            if (entry.status === 'Late') counts.late++;
        });

        return counts;
    };

    const { present, absent, late } = calculateAttendance(formData.attendance || []);

    return (
        <div className={`trainer-preview-modal ${!isClosing ? 'open' : 'close'}`}>
            <div className="trainer-preview-modal__header">
                <div className="trainer-preview-modal__header-left">
                    <h2>Trainer Details</h2>
                </div>
                <button className="trainer-preview-modal__close-icon" onClick={handleClose}>
                    <X color="#333" size={"1.5rem"} />
                </button>
            </div>

            <form className="trainer-preview-modal__form">
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <User style={{ marginRight: '8px' }} />
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter trainer's name"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Mail style={{ marginRight: '8px' }} />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter trainer's email"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Phone style={{ marginRight: '8px' }} />
                        Phone
                    </label>
                    <input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter trainer's phone"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Mail style={{ marginRight: '8px' }} />
                        Address
                    </label>
                    <textarea
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter trainer's address"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Award style={{ marginRight: '8px' }} />
                        Specialization
                    </label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="Trainer's specialization"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Clipboard style={{ marginRight: '8px' }} />
                        Attendance
                    </label>
                    <ul className="trainer-preview-panel__attendance-list">
                        <li className="trainer-preview-panel__attendance-item">Present: {present}</li>
                        <li className="trainer-preview-panel__attendance-item">Absent: {absent}</li>
                        <li className="trainer-preview-panel__attendance-item">Late: {late}</li>
                    </ul>
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <BookOpen style={{ marginRight: '8px' }} />
                        Programs Assigned
                    </label>
                    <ul className="trainer-preview-modal__programs-list" >
                        {formData.programsAssigned?.length > 0 ? (
                            formData.programsAssigned.map((program, index) => (
                                <li key={program._id || index} style={{
                                    display: "flex",
                                    width: "100%",
                                    gap: "0.5rem",
                                    marginBottom:"0.5rem"
                                
                                }} className="trainer-preview-modal__program-item">
                                    <strong>{index + 1}.{program.name}</strong> - <div>{program.programStatus}</div>
                                </li>
                            ))
                        ) : (
                            <li>No programs assigned.</li>
                        )}
                    </ul>
                </div>

                <div className="trainer-preview-modal__form-group">
                    <label>Skills</label>
                    <div className="trainer-preview-modal__skills-list">
                        {formData.skills?.map((skill, index) => (
                            <div className="trainer-preview-modal__skill-item" key={index}>
                                <div style={{
                                    width: "0.3rem",
                                    aspectRatio: "1",
                                    backgroundColor: "white",
                                    display: "flex",
                                    marginRight: "0.5rem",
                                    borderRadius: "1000px"
                                }} ></div>
                                {skill}
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        style={{ marginLeft: "10px", color: "red" }}
                                        className="trainer-preview-modal__remove-skill-button"
                                    >
                                        <Trash size={"0.75rem"} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <div className="trainer-preview-modal__add-skill">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a new skill"
                                className="trainer-preview-modal__add-skill-input"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="trainer-preview-modal__add-skill-button"
                            >
                                <Plus size={"1.2rem"} />
                            </button>
                        </div>
                    )}
                </div>


                <div className="trainer-preview-modal__actions">
                    {isEditing ? (
                        <button
                            type="button"
                            className={`trainer-preview-modal__save-button ${!hasChanges() ? 'disabled' : ''}`}
                            onClick={handleSave}
                            disabled={!hasChanges()}
                        >
                            <Check size={"1rem"} style={{ marginRight: '5px' }} />
                            Save
                        </button>
                    ) : (
                        <button type="button" className="trainer-preview-modal__edit-button" onClick={handleEdit}>
                            <Edit size={"1rem"} style={{ marginRight: '5px' }} />
                            Edit
                        </button>
                    )}
                    <button type="button" className="trainer-preview-modal__delete-button" onClick={handleDelete}>
                        <Trash size={"1rem"} style={{ marginRight: '5px' }} />
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}
