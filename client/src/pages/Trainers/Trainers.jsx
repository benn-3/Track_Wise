import { useState, useEffect } from 'react';
import TrainerPreviewPanel from '../../components/TrainerPreviewPanel/TrainerPreviewPanel';
import AddTrainerPanel from '../../components/AddTrainerPanel/AddTrainerPanel';
import './trainers.css';
import { Search } from 'lucide-react';

const initialTrainers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', specialization: 'Yoga', program: 'Web Development', status: 'Active', attendance: '95%' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', specialization: 'Cardio', program: 'None', status: 'Inactive', attendance: '85%' },
];

export default function Trainers() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [trainers, setTrainers] = useState(initialTrainers);
    const [addTrainerModalIsOpen, setAddTrainerModalIsOpen] = useState(false);


    const handleViewMore = (trainer) => {
        setSelectedTrainer(trainer);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTrainer(null);
    };

    const handleSave = (updatedTrainer) => {
        setTrainers((prev) => prev.map((trainer) =>
            trainer.id === updatedTrainer.id ? updatedTrainer : trainer
        ));
    };

    const handleDelete = (id) => {
        setTrainers((prev) => prev.filter((trainer) => trainer.id !== id));
    };

    const handleAddTrainer = (newTrainer) => {
        setTrainers((prev) => [...prev, newTrainer]);
        setAddTrainerModalIsOpen(false);
    };

    return (
        <div className="trainers-container">
            <div className="trainers-header">
                <div className="trainers-header-text">
                    <div className="trainers-title">Trainers</div>
                </div>
              <div className='trainers-header-left'>
              <div className="trainers-searchbar-container">
                    <Search size="1.7rem" color="#9CA3AF" />
                    <input className="trainers-search-bar" type="text" placeholder="Search trainers, programs..." />
                </div>
                <div
                    className="trainers-add-button"
                    onClick={() => setAddTrainerModalIsOpen(true)}
                >
                    Add Trainer
                </div>
              </div>
            </div>
            <div className="trainers-content">

                <table className="trainers-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialization</th>
                            <th>Program</th>
                            <th>Status</th>
                            <th>Attendance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer) => (
                            <tr key={trainer.id}>
                                <td>{trainer.id}</td>
                                <td>{trainer.name}</td>
                                <td>{trainer.email}</td>
                                <td>{trainer.specialization}</td>
                                <td>{trainer.program}</td>
                                <td>{trainer.status}</td>
                                <td>{trainer.attendance}</td>
                                <td>
                                    <button
                                        className="view-more-button"
                                        onClick={() => handleViewMore(trainer)}
                                    >
                                        View More
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedTrainer && (
                <TrainerPreviewPanel
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    trainer={selectedTrainer}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}

            <AddTrainerPanel
                isOpen={addTrainerModalIsOpen}
                onRequestClose={() => setAddTrainerModalIsOpen(false)}
                onSave={handleAddTrainer}
            />
        </div>
    );
}
