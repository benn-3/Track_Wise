import { SET_ADMIN, SET_AUTH_STATE } from "../types"

export const setAuthState = (isAuthenticated, role) => {
    return {
        type: SET_AUTH_STATE,
        payload: {
            isAuthenticated: isAuthenticated,
            role
        }
    }
}

export const setAdmin = (adminProfile) => {
    return {
        type: SET_ADMIN,
        payload: {
            adminProfile
        }
    }
}