const initState = {
    error: null,
    isLoggedIn: false,
    recoverPasswordMessage: null,
    actionAuthFeedback: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_AUTH_FEEDBACK':
            return {
                ...state,
                actionAuthFeedback: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: 'login-failed',
                isLoggedIn: false,
                actionAuthFeedback: ''
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                actionAuthFeedback: ''
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
                recoverPasswordMessage: action.payload,
                actionAuthFeedback: ''
            }
        case 'RESET_PASSWORD_ERROR':
            return {
                ...state,
                actionAuthFeedback: ''
            }
        case 'CHANGE_PROFILE_SUCCESS':
            return {
                ...state,
                actionAuthFeedback: 'Profile edited'
            }
        case 'CHANGE_PROFILE_ERROR':
            return {
                ...state,
                error: action.error.message
            }
        default:
            return state
    }
}

export default authReducer;