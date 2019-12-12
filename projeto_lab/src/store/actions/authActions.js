export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
            firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            )).then((response) => {
                console.log(response)
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
                createdAt: new Date(),
                email: newUser.email,
                username: newUser.username,
                gender: newUser.gender,
                nationality: newUser.nationality,
                avatar: newUser.avatar,
                favoriteGame: newUser.favoriteGame,
                favoriteRegion: newUser.favoriteRegion,
                friends: [],
                favoriteTeam: [],
                favoritePokemons: [],
                triviaRecord: {
                    correctAnswers: 0,
                    wrongAnswers: 0
                },
                addFavoriteAction: null
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(() => {
            dispatch({ type: 'SIGNUP-ERROR' })
        })
    }
}

export const recoverPassword = (email) => {
    console.log(email)
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() =>
                dispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: "Reset password email sent. Go check your inbox."
                })
            )
            .catch(error => {
                dispatch({
                    type: 'RESET_PASSWORD_ERROR',
                    payload: error.message
                });
            });
    }
}
