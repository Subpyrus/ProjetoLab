var array = require('lodash/array')

export const addFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemons;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    favoritePokemon: profileFavoritePokemons.concat(favorite)
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
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemon;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(profileFavoritePokemons, (item) => {
                    return item === favorite;
                });
                return firestore.collection("users").doc(uid).update({
                    favoritePokemon: profileFavoritePokemons.concat(profileFavoritePokemons)
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
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    favoriteTeam: profileTeamPokemons.concat(pokemon)
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
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", getState.uid).get()
            .then(() => {
                array.remove(profileTeamPokemons, (item) => {
                    return item === pokemon;
                });
                return firestore.collection("users").doc(uid).update({
                    favoriteTeam: profileTeamPokemons.concat(profileTeamPokemons)
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_ERROR' })
            })
    }
}