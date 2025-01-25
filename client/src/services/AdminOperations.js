import axios from "axios";
import { setAdmin } from "../redux/actions/authActions";

const API_URL = 'http://localhost:7000/api/admin';

export const getAdmin = async (token, adminId, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/get-admin?adminId=${adminId}`)
        if (response.status == 200) {
            const data = response.data.admin
            await dispatch(setAdmin(data))
        }
        else {
            console.error(response.data.message);
        }
    }
    catch (err) {
        console.log(err);
    }
}


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

export const getAllTrainers = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-all-trainers`);
        if (response.status === 200) {
            return response.data;
        } else {
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