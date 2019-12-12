const initState = {
    authError: null,
    isLoggedIn: false,
    recoverPasswordMessage: null
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
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                recoverPasswordMessage: action.payload
            }
        case 'RESET_PASSWORD_ERROR':
            return {
                ...state,
                recoverPasswordMessage: action.payload
            }
        default:
            return state
    }
}

export default authReducer;