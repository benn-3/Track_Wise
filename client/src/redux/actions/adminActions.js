import { GET_PROGRAMS, GET_TRAINERS } from "../types"

export const setTrainers = (trainers) => {
    return {
        type: GET_TRAINERS,
        payload: trainers
    }
}

export const setPrograms = (programs) => {
    return {
        type: GET_PROGRAMS,
        payload: programs
    }
}