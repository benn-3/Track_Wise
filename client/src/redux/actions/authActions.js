import { SET_ADMIN, SET_AUTH_STATE } from "../types"

export const setAuthState = (isAuthenticated, role, id) => {
    console.log("ID : ", id)
    return {
        type: SET_AUTH_STATE,
        payload: {
            isAuthenticated: isAuthenticated,
            role,
            id
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