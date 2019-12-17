export const addTriviaResult = (currentResult) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const triviaObject = getState().firebase.profile.triviaRecord;
        triviaObject.realizedTrivias += 1;
        triviaObject.correctAnswers += currentResult.correctAnswers;
        triviaObject.wrongAnswers += currentResult.wrongAnswers;

        var pokemon;
        let allAnswers = triviaObject.correctAnswers + triviaObject.wrongAnswers;
        let averageCorrectAnswers = triviaObject.correctAnswers / allAnswers;
        averageCorrectAnswers *= 100;
        averageCorrectAnswers = parseInt(averageCorrectAnswers);

        if (isNaN(averageCorrectAnswers)) {
            pokemon = null;
        } else if (averageCorrectAnswers >= 90) {
            pokemon = 'alakazam';
        } else if (averageCorrectAnswers >= 75) {
            pokemon = 'metagross';
        } else if (averageCorrectAnswers >= 50) {
            pokemon = 'beheeyem';
        } else if (averageCorrectAnswers >= 25) {
            pokemon = 'quagsire';
        } else if (averageCorrectAnswers >= 10) {
            pokemon = 'slowpoke';
        } else {
            pokemon = 'magikarp';
        }

        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    triviaRecord: {
                        pokemonIQ: pokemon,
                        realizedTrivias: triviaObject.realizedTrivias,
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