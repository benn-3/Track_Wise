/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { X, Check, Trash, Edit, User, Mail, Award, Clipboard, Activity } from 'lucide-react';

export default function TrainerPreviewModal({ isOpen, onRequestClose, trainer, onSave, onDelete }) {
    const [formData, setFormData] = useState(trainer);
    const [isClosing, setIsClosing] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Add state to toggle edit mode

    useEffect(() => {
        setFormData(trainer); // Reset form data when modal is opened
    }, [trainer, isOpen]);

    // Function to check if the form data has changed
    const hasChanges = () => {
        return JSON.stringify(formData) !== JSON.stringify(trainer);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false); // After saving, switch back to view mode
        onRequestClose();
    };

    const handleDelete = () => {
        onDelete(trainer.id);
        onRequestClose();
    };

    const handleEdit = () => {
        setIsEditing(true); // Switch to edit mode
    };

    return (
        <div className={`trainer-preview-modal ${!isClosing ? 'open' : 'close'}`}>
            <button className="trainer-preview-modal__close-icon" onClick={onRequestClose}>
                <X color='#333' size={24} />
            </button>
            <h2>Trainer Details</h2>
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
                        disabled={!isEditing} // Disable when not editing
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
                        Program
                    </label>
                    <input
                        type="text"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        placeholder="Trainer's program"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Activity style={{ marginRight: '8px' }} />
                        Status
                    </label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        placeholder="Trainer's status"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__form-group">
                    <label>
                        <Clipboard style={{ marginRight: '8px' }} />
                        Attendance
                    </label>
                    <input
                        type="text"
                        name="attendance"
                        value={formData.attendance}
                        onChange={handleChange}
                        placeholder="Trainer's attendance"
                        disabled={!isEditing}
                    />
                </div>
                <div className="trainer-preview-modal__actions">
                    {isEditing ? (
                        <button
                            type="button"
                            className={`trainer-preview-modal__save-button ${!hasChanges() ? 'disabled' : ''}`}
                            onClick={handleSave}
                            disabled={!hasChanges()} // Disable save if no changes
                        >
                            <Check size={16} style={{ marginRight: '5px' }} />
                            Save
                        </button>
                    ) : (
                        <button type="button" className="trainer-preview-modal__edit-button" onClick={handleEdit}>
                            <Edit size={16} style={{ marginRight: '5px' }} />
                            Edit
                        </button>
                    )}
                    <button type="button" className="trainer-preview-modal__delete-button" onClick={handleDelete}>
                        <Trash size={16} style={{ marginRight: '5px' }} />
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}
