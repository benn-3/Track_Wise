import { useState, useEffect, useCallback } from 'react';
import TrainerPreviewPanel from '../../components/TrainerPreviewPanel/TrainerPreviewPanel';
import AddTrainerPanel from '../../components/AddTrainerPanel/AddTrainerPanel';
import './trainers.css';
import { Search } from 'lucide-react';
import { getAllTrainers } from '../../services/AdminOperations';
import Loader from '../../components/Loader/Loader';

export default function Trainers() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [trainers, setTrainers] = useState([]);
    const [filteredTrainers, setFilteredTrainers] = useState([]);
    const [addTrainerModalIsOpen, setAddTrainerModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem("Token");


    const fetchAllTrainers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllTrainers(token);
            if (response.success) {
                setTrainers(response.trainers);
                setFilteredTrainers(response.trainers);
            } else {
                setError('Failed to fetch trainers');
            }
        } catch (err) {
            console.error("Error fetching trainers:", err);
            setError('An error occurred while fetching trainers');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchAllTrainers();
    }, [fetchAllTrainers]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = trainers.filter((trainer) =>
                trainer.trainerId.toString().includes(searchQuery.toLowerCase()) ||
                trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (trainer.specialization && String(trainer.specialization).toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredTrainers(filtered);
        } else {
            setFilteredTrainers(trainers);
        }
    }, [searchQuery, trainers]);

    const handleViewMore = (trainer) => {
        setSelectedTrainer(trainer);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTrainer(null);
    };



    return (
        <div className="trainers-container">
            <div className="trainers-header">
                <div className="trainers-header-text">
                    <div className="trainers-title">Manage Trainers</div>
                </div>
                <div className='trainers-header-left'>
                    <div className="trainers-searchbar-container">
                        <Search size="1.7rem" color="#9CA3AF" />
                        <input
                            className="trainers-search-bar"
                            type="text"
                            placeholder="Search trainers, programs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div
                        className="trainers-add-button"
                        onClick={() => setAddTrainerModalIsOpen(true)}
                        required
                    >
                        Add Trainer
                    </div>
                </div>
            </div>
            <div className="trainers-content">
                {filteredTrainers.length > 0 ? (
                    <table className="trainers-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Specialization</th>
                                <th>Availability</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrainers.map((trainer) => (
                                <tr key={trainer.trainerId}>
                                    <td>{trainer.trainerId}</td>
                                    <td>{trainer.name}</td>
                                    <td>{trainer.email}</td>
                                    <td>{trainer.specialization}</td>
                                    <td>
                                        <div
                                            className={`trainers-table-status-container ${trainer.availability && trainer.availability.toLowerCase() === "assigned"
                                                ? "trainers-table-status-active"
                                                : "trainers-table-status-inactive"
                                                }`}
                                        >
                                            {trainer.availability || "N/A"}
                                        </div>
                                    </td>

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
                ) : (
                    <div>No trainers found</div>
                )}
            </div>

            {selectedTrainer && (
                <TrainerPreviewPanel
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    trainer={selectedTrainer}
                    onEditTrainerSuccess={fetchAllTrainers}
                    onTrainerDeleted={fetchAllTrainers}
                />
            )}
            <AddTrainerPanel
                isOpen={addTrainerModalIsOpen}
                onRequestClose={() => setAddTrainerModalIsOpen(false)}
                onAddTrainerSuccess={fetchAllTrainers}
            />
        </div>
    );
}
