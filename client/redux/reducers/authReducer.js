import { SET_AUTH_STATE } from "../types"

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        default:
            return state

    }
}