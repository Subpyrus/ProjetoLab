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

        console.log(before.favoritePokemons)
        console.log(after.favoritePokemons)
        console.log(before.favoritePokemons !== after.favoritePokemons)
        console.log(before.favoriteTeam !== after.favoriteTeam)

        if (before.favoritePokemons !== after.favoritePokemons) {
            console.log('olá')
            if (after.addFavoriteAction === true) {
                const notification = {
                    content: `Added ${after.favoritePokemons[after.favoritePokemons.length - 1].name} to their Favorites Pokémon List`,
                    user: `${after.username}`,
                    avatar: `${after.avatar}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            } else {
                const notification = {
                    content: `Removed ${before.favoritePokemons[before.favoritePokemons.length - 1].name} from their Favorites Pokémon List`,
                    user: `${after.username}`,
                    avatar: `${after.avatar}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            }
        } else if (before.favoriteTeam !== after.favoriteTeam) {
            if (after.addFavoriteAction === true) {
                const notification = {
                    content: `Added ${after.favoritePokemons[after.favoritePokemons.length - 1].name} to their Favorite Pokémon Team`,
                    user: `${after.username}`,
                    avatar: `${after.avatar}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            } else {
                const notification = {
                    content: `Removed ${before.favoritePokemons[before.favoritePokemons.length - 1].name} from their Favorite Pokémon Team`,
                    user: `${after.username}`,
                    avatar: `${after.avatar}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification)
            }
        } else if (before.friends !== after.friends) {
            const notification = {
                content: `Added ${after.friends[user.friends.length - 1].username} to their friend list`,
                user: `${after.username}`,
                avatar: `${after.avatar}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotification(notification)
        } else if (before.triviaRecord !== after.triviaRecord) {
            const notification = {
                content: `Concluded a PokéTrivia and currently has a record of ${after.triviaRecord.correctAnswers} correct answers and ${after.triviaRecord.wrongAnswers} of incorrect answers.`,
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
            content: 'Welcome to Pokéfavorite',
            user: `${newUser.username}`,
            avatar: `${newUser.avatar}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })
})

