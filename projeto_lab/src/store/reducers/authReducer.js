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
                error: action.error.message,
                isLoggedIn: false,
                actionAuthFeedback: ['Ops! An error occurred, sign in failed. Your password or e-mail might be wrong...', 'danger']
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                actionAuthFeedback: ['Sign in successful', 'success']
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                isLoggedIn: false
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                actionAuthFeedback: ['Sign up successful, you are now a member of PokéFavo', 'success']
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message,
                isLoggedIn: false,
                actionAuthFeedback: ['Ops! An error occurred, sign in failed', 'failed']
            }
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                recoverPasswordMessage: action.payload,
                actionAuthFeedback: ['Action successful! Check your e-mail box to change your password!', 'success']
            }
        case 'RESET_PASSWORD_ERROR':
            return {
                ...state,
                actionAuthFeedback: ['Ops! An error occurred, we were not able to send you an e-mail to change your password', 'danger']
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