const initState = {
    isLoading: false,
    apiData: {
        signUpData: '',
        getPokemon: '',
        getPokemonIQ: '',
        getPokedex: '',
        getPokedexDropdowns: {
            regions: '',
            types: '',
        },
        getMove: '',
        getEvChain: ''
    },
    error: null
}

const apiReducer = (state = initState, action) => {
    switch (action.type) {
        case 'API_REQUEST_START':
            return {
                ...state,
                isLoading: true
            }
        case 'SIGNUP_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, signUpData: action.payload }
            }
        case 'SIGNUP_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'POKEMONINFO_DATA_SUCCESS':
            return {
                ...state,
                error: action.error,
                apiData: { ...state.apiData, getPokemon: action.payload }
            }
        case 'POKEMONINFO_EVOLUTION_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, getEvChain: action.payload }
            }
        case 'POKEMONINFO_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'POKEMONINFO_EVOLUTION_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'POKEDEX_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, getPokedex: action.payload }
            }
        case 'POKEDEX_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'POKELIST_PAGE_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, getPokedexDropdowns: { regions: action.payload[0].results, types: action.payload[1].results } }
            }
        case 'POKELIST_PAGE_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'POKE_PROFILE_IQ_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, getPokemonIQ: action.payload }
            }
        case 'POKE_PROFILE_IQ_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'GETMOVE_DATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: action.error,
                apiData: { ...state.apiData, getMove: action.payload }
            }
        case 'GETMOVE_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default apiReducer;