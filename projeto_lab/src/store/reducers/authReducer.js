const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login failed')
            return {
                ...state,
                authError: 'login-failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCESS':
            return state
        case 'SIGNUP_SUCCESS':
            return {
                ...state
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state
    }
}

export default authReducer;