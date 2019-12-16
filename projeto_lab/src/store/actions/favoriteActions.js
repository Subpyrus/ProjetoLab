var array = require('lodash/array')

export const addFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirestore }) => {
        console.log(favorite)
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemons;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: true,
                    favoritePokemons: profileFavoritePokemons.concat({
                        name: favorite[0],
                        stats: favorite[1]
                    })
                });
            }).then(() => {
                dispatch({ type: 'ADD_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_FAVORITE_ERROR' })
            })
    }
}

export const removeFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemons;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(profileFavoritePokemons, (item) => {
                    return item.name === favorite;
                });
                console.log(profileFavoritePokemons);
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: false,
                    favoritePokemons: profileFavoritePokemons
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_FAVORITE_ERROR' })
            })
    }
}

export const addPokemonToTeam = (pokemon) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: true,
                    favoriteTeam: profileTeamPokemons.concat({
                        name: pokemon[0],
                        stats: pokemon[1]
                    })
                });
            }).then(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_ERROR' })
            })
    }
}

export const removePokemonFromTeam = (pokemon) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(profileTeamPokemons, (item) => {
                    return item.name === pokemon;
                });
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: false,
                    favoriteTeam: profileTeamPokemons
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_ERROR' })
            })
    }
}