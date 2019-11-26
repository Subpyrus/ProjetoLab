const initState = {
    authError: ''
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
            console.log('logout success')
            return state
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state
    }
}

export default authReducer;