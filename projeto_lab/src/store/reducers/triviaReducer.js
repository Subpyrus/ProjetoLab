const initState = {
    updateTriviaResult: null
}

const triviaReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TRIVIA_SUCCESS':
            return {
                ...state,
                updateTriviaResult: 'Trivia Results Updated'
            }
        case 'ADD_TRIVIA_ERROR':
            return {
                ...state,
                updateTriviaResult: action.error.message
            }
        default:
            return state
    }
}

export default triviaReducer;