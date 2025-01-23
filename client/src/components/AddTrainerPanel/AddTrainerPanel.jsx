import { useState, useEffect } from 'react';
import { X, UserPen, CheckCircle, User, Mail, Award, Phone, Calendar } from 'lucide-react';

export default function AddTrainerPanel({ isOpen, onRequestClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        specialization: '',
        program: '',
    });
    
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if all fields are filled
        const isValid = Object.values(formData).every((field) => field.trim() !== '');
        setIsFormValid(isValid);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (isFormValid) {
            onSave(formData);
            onRequestClose();
        }
    };

    const handleClose = () => {
        onRequestClose();
    };

    return (
        <div className={`add-trainer-panel ${isOpen ? 'add-trainer-panel--open' : 'add-trainer-panel--close'}`}>
            <button className="add-trainer-panel__close-icon" onClick={handleClose}>
                <X color="#333" size={24} />
            </button>
            <h2 className="add-trainer-panel__title">Add Trainer</h2>
            <form className="add-trainer-panel__form">
                <div className="add-trainer-panel__form-group">
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
                        required 
                    />
                </div>
                <div className="add-trainer-panel__form-group">
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
                        required 
                    />
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <Phone style={{ marginRight: '8px' }} />
                        Phone
                    </label>
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="Enter phone number"
                        required 
                    />
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <Calendar style={{ marginRight: '8px' }} />
                        Age
                    </label>
                    <input 
                        type="number" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        placeholder="Enter age"
                        required 
                    />
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <UserPen style={{ marginRight: '8px' }} />
                        Gender
                    </label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>
                            Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <Award style={{ marginRight: '8px' }} />
                        Specialization
                    </label>
                    <input 
                        type="text" 
                        name="specialization" 
                        value={formData.specialization} 
                        onChange={handleChange} 
                        placeholder="E.g., C++, Python"
                        required 
                    />
                </div>
                <div className="add-trainer-panel__actions">
                    <button 
                        type="button" 
                        className={`add-trainer-panel__save-button ${!isFormValid ? 'disabled' : ''}`} 
                        onClick={handleSave} 
                        disabled={!isFormValid}
                    >
                        <CheckCircle size={16} style={{ marginRight: '5px' }} />
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
