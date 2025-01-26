import { GET_PROGRAMS, GET_TRAINERS } from "../types";

const initialState = {
    trainers: null,
    programs: null
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINERS:
            return { ...state, trainers: action.payload };
        case GET_PROGRAMS:
            return { ...state, programs: action.payload };
        default:
            return state;
    }
}