import { GET_PROGRAMS, GET_TRAINERS } from "../types";
import { produce } from "immer";

const initialState = {
    trainers: null,
    programs: null
}

export const adminReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case GET_TRAINERS:
                draftState.trainers = action.payload;
                break;
            case GET_PROGRAMS:
                draftState.programs = action.payload.map(program => ({
                    ...program,
                    dailyTasks: program.dailyTasks ? [...program.dailyTasks] : []
                }));
                break;
            default:
                break;
        }
    });
}
