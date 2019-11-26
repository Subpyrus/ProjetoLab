const initState = {
}

const favoriteReducer = (state = initState, action) => {
    if (action.type === "ADD_FAVORITE"){
        console.log(action);
    } else {
        console.log(action)
    }
    return state
}

export default favoriteReducer;