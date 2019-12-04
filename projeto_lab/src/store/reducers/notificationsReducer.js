const initState = {
    notifications: '',
    isLoaded: false
}

const notificationsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS_SUCCESS':
            return {
                ...state,
                notifications: action.payload,
                isLoaded: true
            }
        case 'GET_NOTIFICATIONS_ERROR':
            return {
                ...state,
                notifications: action.payload,
                isLoaded: true
            }
        default:
            return state
    }
}

export default notificationsReducer;