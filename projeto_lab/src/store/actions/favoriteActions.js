export const createFavorite = (favorite) => {
    return (dispatch, getState) => {
        dispatch({type: 'ADD_FAVORITE', favorite})
    }
}