import axios from "axios";
import { setAdmin } from "../redux/actions/authActions";
import { setPrograms, setTrainers } from "../redux/actions/adminActions";
import store from "../redux/store";

const getIP = () => {
    const states = store.getState();
    const ip = states.auth.IP;
    return ip;
};

const API_URL = `${getIP()}/api/admin`;

export const getAdmin = async (token, adminId, dispatch) => {
    if (!adminId) {
        console.error("Admin ID is not available.");
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/get-admin?adminId=${adminId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const data = response.data.admin;
            dispatch(setAdmin(data));
        } else {
            console.error(response.data.message);
        }
    } catch (err) {
        console.error("Error fetching admin details:", err.message || err);
    }
};

export const adminSignup = async (signupData) => {
    try {
        const response = await axios.post(`${API_URL}/admin-signup`, signupData);
        if (response.status === 200 || response.status === 201) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Something went wrong. Please try again later.',
        };
    }
};

export const adminSignin = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/admin-signin`, loginData);
        if (response.status === 200) {
            localStorage.setItem('Token', response.data.token);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error("Signin error:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Something went wrong. Please try again later.',
        };
    }
};

export const handleAddTrainer = async (token, formData) => {
    try {
        const response = await axios.post(`${API_URL}/add-trainer`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding trainer:", error);
        return { error: "An error occurred. Please try again." };
    }
};

export const getAllTrainers = async (token, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/get-all-trainers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            dispatch(setTrainers(response.data.trainers));
        } else {
            dispatch(setTrainers([]));
            throw new Error('Failed to fetch trainers');
        }
    } catch (error) {
        console.error('Error fetching trainers:', error.message);
        return { error: error.message || 'An unknown error occurred' };
    }
};

export const editTrainer = async (token, trainerId, formData) => {
    try {
        const response = await axios.put(`${API_URL}/edit-trainer`, { trainerId, formData }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error editing trainer:', err.message);
    }
};

export const deleteTrainer = async (token, trainerId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-trainer?trainerId=${trainerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error deleting trainer:', err.message);
    }
};

export const addProgram = async (token, formData) => {
    try {
        const response = await axios.post(`${API_URL}/add-program`, { formData }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error adding program:', err.message);
    }
};

export const getAllPrograms = async (token, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/get-all-programs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            let programs = response.data.programs;
            dispatch(setPrograms(programs));
        } else {
            dispatch(setPrograms([null]));
        }
    } catch (err) {
        console.error('Error getting all programs:', err.message);
    }
};

export const deleteTask = async (token, programId, taskId, dispatch) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-task?programId=${programId}&taskId=${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            await getAllPrograms(token, dispatch);
            return response.data;
        }
    } catch (err) {
        console.error('Error deleting task:', err.message);
    }
};

export const addTask = async (token, programId, newTaskList, dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/add-task`, { programId, newTaskList }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            await getAllPrograms(token, dispatch);
            return response.data;
        }
    } catch (err) {
        console.error('Error adding task:', err.message);
    }
};

export const handleProgramEdit = async (token, programId, changes, dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/edit-program`, { programId, changes }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            await getAllPrograms(token, dispatch);
            await getAllTrainers(token, dispatch);
            return response.data;
        }
    } catch (err) {
        console.error('Error editing program:', err.message);
    }
};

export const handleDelete = async (token, programId, dispatch) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-program`, {
            data: { programId },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            await getAllPrograms(token, dispatch);
            return response.data;
        }
    } catch (err) {
        console.error('Error deleting program:', err.message);
    }
};
