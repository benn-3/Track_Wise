import { SET_TRAINER_DATA } from "../types"

const initialState = {
    assignedPrograms: null,
}

export const trainerReducer =  (state = initialState, action) => {
    switch (action.type) {
        case SET_TRAINER_DATA:
            return {
                ...state,
                assignedPrograms: action.payload
            }
        default:
            return state
    }
}