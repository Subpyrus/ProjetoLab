const initState = {
    authError: null,
    isLoggedIn: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'login-failed',
                isLoggedIn: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                isLoggedIn: true
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                isLoggedIn: false
            } 
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default authReducer;