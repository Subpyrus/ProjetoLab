const initState = {
    actionError: null
}

const favoriteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE_SUCCESS':
            console.log('Action Success')
            return {
                ...state,
                actionError: null
            }
        case 'ADD_FAVORITE_ERROR':
            console.log('Action failed')
            return {
                ...state,
                actionError: action.error.message
            }
        case 'REMOVE_FAVORITE_SUCCESS':
            console.log('Action Success')
            return {
                ...state,
                actionError: null
            }
        case 'REMOVE_FAVORITE_ERROR':
            console.log('Action failed')
            return {
                ...state,
                actionError: action.error.message
            }
        case 'ADD_POKEMON_TEAM_SUCCESS':
            console.log('Action Success')
            return {
                ...state,
                actionError: null
            }
        case 'ADD_POKEMON_TEAM_ERROR':
            console.log('Action failed')
            return {
                ...state,
                actionError: action.error.message
            }
        case 'REMOVE_POKEMON_TEAM_SUCCESS':
            console.log('Action Success')
            return {
                ...state,
                actionError: null
            }
        case 'REMOVE_POKEMON_TEAM_ERROR':
            console.log('Action failed')
            return {
                ...state,
                actionError: action.error.message
            }
        default:
            return state
    }
}

export default favoriteReducer;