export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        console.log(credentials);
        const firebase = getFirebase();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => 
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'LOGIN_ERROR', error })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                username: newUser.username,
                favoriteTeam: [],
                favoritePokemons: [],
                quizzRecord: []
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(() => {
            dispatch({ type: 'SIGNUP-ERROR' })
        })

    }
} 