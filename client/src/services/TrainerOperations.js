import axios from "axios";
import { setTrainerData } from "../redux/actions/trainerActions";
import { setTrainer } from "../redux/actions/authActions";

const API_URL = 'http://192.168.1.5:7000/api/trainer';

export const getTrainer = (token, trainerId, dispatch) => {

    const fetchTrainerData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-trainer?trainerId=${trainerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let trainer = response.data.trainer;
                dispatch(setTrainer(trainer));
            } else {
                console.log("Error in fetching trainer data");
            }
        } catch (err) {
            console.log(err);
        }
    };


    fetchTrainerData();
};



export const handleTrainerLogin = async (token, formData) => {
    try {
        const response = await axios.post(`${API_URL}/trainer-login`, {
            formData
        });

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const handleGetTrainerData = async (token, trainerId, dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/trainer-data?trainerId=${trainerId}`)

        if (response.data.success) {
            dispatch(setTrainerData(response.data.trainer))

        }
        else {
            dispatch(setTrainerData([]))
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const handleMarkAsComplete = async (token, programId, trainerId, taskId, dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/mark-task-completed`, {
            programId,
            trainerId,
            taskId
        })
        await handleGetTrainerData(token, trainerId, dispatch)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}