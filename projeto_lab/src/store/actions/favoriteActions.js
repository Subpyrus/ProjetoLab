export const addFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then((response) => {
                return firestore.collection("users").doc(response.id).update({
                    profileFavorites: "bar"
                });
            }).then(() => {
                dispatch({ type: 'ADD_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_FAVORITE_ERROR' })
            })
    }
}

export const removeFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then((response) => {
                return firestore.collection("users").doc(response.id).update({
                    profileFavorites: "bar"
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_FAVORITE_ERROR' })
            })
    }
}

export const addPokemonToTeam = (pokemon) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then((response) => {
                return firestore.collection("users").doc(response.id).update({
                    profileFavorites: "bar"
                });
            }).then(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_ERROR' })
            })
    }
}

export const removePokemonToTeam = (pokemon) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then((response) => {
                return firestore.collection("users").doc(response.id).update({
                    profileFavorites: "bar"
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_ERROR' })
            })
    }
}