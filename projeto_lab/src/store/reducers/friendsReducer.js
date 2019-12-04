const initState = {
    actionFriendError: null
}

const friendsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_FRIEND_SUCCESS':
            return {
                ...state,
                actionFriendError: 'Friend Added'
            }
        case 'ADD_FRIEND_ERROR':
            return {
                ...state,
                actionFriendError: action.error.message
            }
        case 'REMOVE_FRIEND_SUCCESS':
            return {
                ...state,
                actionFriendError: 'Friend removed'
            }
        case 'REMOVE_FRIEND_ERROR':
            return {
                ...state,
                actionFriendError: action.error.message
            }
        default:
            return state
    }
}

export default friendsReducer;