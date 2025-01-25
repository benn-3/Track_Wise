import { SET_AUTH_STATE } from "../types"

export const setAuthState = (isAuthenticated) => {
    return {
        type: SET_AUTH_STATE,
        payload: {
            isAuthenticated: isAuthenticated
        }
    }
}