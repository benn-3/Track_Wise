import axios from "axios";
import { setAdmin } from "../redux/actions/authActions";
import { setPrograms, setTrainers } from "../redux/actions/adminActions";

const API_URL = 'http://172.17.0.26:7000/api/admin';

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
        if (response.status === 200) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message || 'Something went wrong. Please try again later.' };
        } else {
            return { success: false, message: 'Network error or timeout. Please check your connection and try again.' };
        }
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
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.message || 'Something went wrong. Please try again later.' };
        } else {
            return { success: false, message: 'Network error or timeout. Please check your connection and try again.' };
        }
    }
};

export const handleAddTrainer = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/add-trainer`, formData);
        return response.data;
    } catch (error) {
        console.error("Error adding trainer:", error);
        return { error: "An error occurred. Please try again." };
    }
};

export const getAllTrainers = async (token, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/get-all-trainers`);
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
        const response = await axios.put(`${API_URL}/edit-trainer`, {
            trainerId,
            formData
        });
        return response.data;
    }
    catch (err) {
        console.error('Error editing trainer:', err.message);
    }
}


export const deleteTrainer = async (token, trainerId) => {
    console.log(trainerId)
    try {
        const response = await axios.delete(`${API_URL}/delete-trainer?trainerId=${trainerId}`);
        return response.data;
    }
    catch (err) {
        console.error('Error deleting trainer:', err.message);
    }

}

export const addProgram = async (token, formData) => {
    console.log(formData)
    try {
        const response = await axios.post(`${API_URL}/add-program`, {
            formData
        });
        return response.data;
    }
    catch (err) {
        console.error('Error adding program:', err.message);
    }


}

export const getAllPrograms = async (token, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/get-all-programs`);
        if (response.status === 200) {
            dispatch(setPrograms(response.data.programs))
        }
        else {
            dispatch(setPrograms([]))
        }
    }
    catch (err) {
        console.error('Error getting all programs:', err.message);
    }
}

export const deleteTask = async (token, programId, taskId, dispatch) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-task?programId=${programId}&taskId=${taskId}`);
        console.log(response.data)
        if (response.status == 200) {
            await getAllPrograms(token, dispatch)
            return response.data;
        }
        else {
            return response.data;
        }
    }
    catch (err) {
        console.error('Error deleting task:', err.message);
    }
}


export const addTask = async (token, programId,newTaskList,dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/add-task`, {
            programId,
            newTaskList
        });

        if (response.status === 200) {
            await getAllPrograms(token, dispatch)
            return response.data;
        }

    }
    catch (err) {
        console.error('Error adding task:', err.message);
    }
}