const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification).then(doc => console.log('notification added', doc))
}

exports.userDataChanged = functions.firestore
    .document('users/{userId}')
    .onUpdate((doc) => {
        var before = doc.before.data();
        var after = doc.after.data();

        if (before.favoritePokemons.length !== after.favoritePokemons.length) {
            if (after.addFavoriteAction === true) {
                const notification = {
                    content: `Added ${after.favoritePokemons[after.favoritePokemons.length - 1].name} to their Favorites Pokémon List`,
                    user: after.username,
                    avatar: after.avatar,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            } else {
                const notification = {
                    content: `Removed ${before.favoritePokemons[before.favoritePokemons.length - 1].name} from their Favorites Pokémon List`,
                    user: after.username,
                    avatar: after.avatar,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            }
        } else if (before.favoriteTeam.length !== after.favoriteTeam.length) {
            if (after.addFavoriteAction === true) {
                const notification = {
                    content: `Added ${after.favoriteTeam[after.favoriteTeam.length - 1].name} to their Favorite Pokémon Team`,
                    user: after.username,
                    avatar: after.avatar,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            } else {
                const notification = {
                    content: `Removed ${before.favoriteTeam[before.favoriteTeam.length - 1].name} from their Favorite Pokémon Team`,
                    user: after.username,
                    avatar: after.avatar,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            }
        } else if (before.friends.length !== after.friends.length) {
            const notification = {
                content: `Added ${after.friends[after.friends.length - 1].username} to their following list`,
                user: `${after.username}`,
                avatar: `${after.avatar}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotification(notification)
        } else if (before.triviaRecord.realizedTrivias !== after.triviaRecord.realizedTrivias) {
            var string = require('lodash/string')
            const notification = {
                content: `Concluded a PokéTrivia and currently has a record of ${after.triviaRecord.correctAnswers} correct answers and ${after.triviaRecord.wrongAnswers} of incorrect answers, which makes their pokémon IQ ${string.startCase(after.triviaRecord.pokemonIQ)}.`,
                user: `${after.username}`,
                avatar: `${after.avatar}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotification(notification)
        }
    })

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
            content: 'Just joined PokéFavo!',
            user: `${newUser.username}`,
            avatar: `${newUser.avatar}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })
})

