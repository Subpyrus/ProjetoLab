const initState = {
    actionError: null
}

const favoriteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE_SUCCESS':
            return {
                ...state,
                actionError: 'Favorite Added'
            }
        case 'ADD_FAVORITE_ERROR':
            return {
                ...state,
                actionError: action.error.message
            }
        case 'REMOVE_FAVORITE_SUCCESS':
            return {
                ...state,
                actionError: 'Favorite Removed'
            }
        case 'REMOVE_FAVORITE_ERROR':
            return {
                ...state,
                actionError: action.error.message
            }
        case 'ADD_POKEMON_TEAM_SUCCESS':
            return {
                ...state,
                actionError: 'Added Pokémon to Team'
            }
        case 'ADD_POKEMON_TEAM_ERROR':
            return {
                ...state,
                actionError: action.error.message
            }
        case 'REMOVE_POKEMON_TEAM_SUCCESS':
            return {
                ...state,
                actionError: 'Removed Pokémon from Team'
            }
        case 'REMOVE_POKEMON_TEAM_ERROR':
            return {
                ...state,
                actionError: action.error.message
            }
        default:
            return state
    }
}

export default favoriteReducer;