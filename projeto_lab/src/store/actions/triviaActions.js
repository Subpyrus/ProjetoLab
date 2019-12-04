export const addTriviaResult = (currentResult) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const triviaObject = getState().firebase.profile.triviaRecord;
        triviaObject.correctAnswers += currentResult.correctAnswers;
        triviaObject.wrongAnswers += currentResult.wrongAnswers;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    triviaRecord: {
                        correctAnswers: triviaObject.correctAnswers,
                        wrongAnswers: triviaObject.wrongAnswers
                    }
                });
            }).then(() => {
                dispatch({ type: 'ADD_TRIVIA_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_TRIVIA_ERROR' })
            })
    }
}