import { SET_ADMIN, SET_AUTH_STATE } from "../types"

const initialState = {
    user: null,
    token: null,
    isAuthenticated: true,
    role: null,
    id: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                role: action.payload.role,
                id: action.payload.id
            }
        case SET_ADMIN:
            return {
                ...state,
                user: action.payload.adminProfile,
            }
        default:
            return state

    }
}