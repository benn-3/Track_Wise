import axios from "axios";

const API_URL = 'http://localhost:7000/api/auth';

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
