const initState = {
    actionFriendError: null,
    friendData: '',
    allUsers: '',
    actionFriendsFeedback: null
}

const friendsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_FRIENDS_FEEDBACK':
            return {
                ...state,
                actionFriendsFeedback: null
            }
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
                actionFriendError: action.error
            }
        case 'GET_FRIEND_SUCCESS':
            return {
                ...state,
                friendData: action.payload
            }
        case 'GET_FRIEND_ERROR':
            return {
                ...state,
                friendData: action.error
            }
        default:
            return state
    }
}

export default friendsReducer;