import { useState } from 'react';
import { X, UserPen, CheckCircle, User, Mail, Award, Phone, Calendar, MapPin } from 'lucide-react';
import { handleAddTrainer } from '../../services/AdminOperations';

export default function AddTrainerPanel({ isOpen, onRequestClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        specialization: '',
        address: '',
    });

    const [errors, setErrors] = useState({}); 

    const validateForm = () => {
        const newErrors = {};

        
        if (!formData.name.trim()) newErrors.name = 'Name is required.';

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        
        const phoneRegex = /^[0-9]{10}$/; 
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number.';
        }

        
        if (!formData.age.trim()) newErrors.age = 'Age is required.';
        if (!formData.gender.trim()) newErrors.gender = 'Gender is required.';
        if (!formData.specialization.trim())
            newErrors.specialization = 'Specialization is required.';
        if (!formData.address.trim()) newErrors.address = 'Address is required.';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' })); 
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; 

        console.log('Saving Trainer Data:', formData);

        try {
            const response = await handleAddTrainer(formData);

            if (response) {
                console.log('Trainer added:', response);
            }

            onRequestClose();
        } catch (error) {
            console.error('Error while saving trainer:', error);
        }
    };

    const handleClose = () => {
        console.log('Panel closed');
        onRequestClose();
    };

    return (
        <div className={`add-trainer-panel ${isOpen ? 'add-trainer-panel--open' : 'add-trainer-panel--close'}`}>
            <div className="add-trainer-panel__header">
                <h2 className="add-trainer-panel__title">Add Trainer</h2>
                <button className="add-trainer-panel__close-icon" onClick={handleClose}>
                    <X color="#333" size={24} />
                </button>
            </div>
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
                    {errors.name && <span className="error-text">{errors.name}</span>}
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
                    {errors.email && <span className="error-text">{errors.email}</span>}
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
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
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
                    {errors.age && <span className="error-text">{errors.age}</span>}
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <UserPen style={{ marginRight: '8px' }} />
                        Gender
                    </label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <span className="error-text">{errors.gender}</span>}
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
                    {errors.specialization && <span className="error-text">{errors.specialization}</span>}
                </div>
                <div className="add-trainer-panel__form-group">
                    <label>
                        <MapPin style={{ marginRight: '8px' }} />
                        Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        rows="3"
                        required
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="add-trainer-panel__actions">
                    <button
                        type="button"
                        className="add-trainer-panel__save-button"
                        onClick={handleSave}
                    >
                        <CheckCircle size={16} style={{ marginRight: '5px' }} />
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
